import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export enum BinaryFrameCommand {
  Write = 4,
}

@Injectable()
export class WebSocketService {
  /**
   * Event used when connection changes
   * @type {function({result: Boolean, [code]: Number, [reason]:String})}
   */
  public onConnectStateChange!: (
    result: boolean,
    code?: number,
    reason?: string
  ) => void;
  /**
   * Event used when a message is received
   * @type {function({data: (String|Blob|ArrayBuffer|Object)})}
   */
  public onMessage!: (data: any) => void;

  /**
   * The current connected websocket instance
   * @type {Object}
   * @private
   */
  private webSocket: WebSocket | undefined;

  /**
   * The current port
   */
  private connectedToPort = 0;

  /**
   * Function used to generate a port number
   * @type {function({skip: Number, count: Number})}
   * @private
   */
  private portNumberGenerator!: (skip: number, count: number) => number[];

  /**
   * Maximum number of ports to test
   * @type {number}
   * @private
   */
  private maxPorts = 0;

  /**
   * Keep the command callbacks
   * @type {Object}
   * @private
   */
  private commandCallbacks: Map<
    string,
    { success: (data: any) => void; failure: (reason?: any) => void }
  > = new Map<
    string,
    { success: (data: any) => void; failure: (reason?: any) => void }
  >();

  /**
   * Indicate if the attempt loop should be stopped at end
   * @type {boolean}
   * @private
   */
  private isStopRequested = false;

  /**
   * Function used for disabling infinitely attempts
   * @type {function()}
   */
  public stopRequested() {
    this.isStopRequested = true;
  }

  /**
   * Try establishing connection
   * @param {Function} portGenerator A function to generate port number
   * @param {Number} maxPorts The maximum simultaneous connection attempt
   * @param {Boolean} [singleLoop] Indicate if a single attempt loop is done (true), or an infinite loop (false)
   */
  public startWebSocketConnection(
    portGenerator: (skip: number, count: number) => number[],
    maxPorts: number,
    singleLoop?: boolean
  ): void {
    this.portNumberGenerator = portGenerator;
    this.maxPorts = maxPorts || 1; // by default use single port test
    this.isStopRequested = singleLoop || false;
    this.webSocket = undefined;
    this.restartWebSocketConnection_();
  }

  /**
   * Send a frame to server and returns a promise
   * @param {Object} msg The message to send
   * @return {Promise<T>} A promise (generic)
   */
  public send<T>(msg: any): Promise<T> {
    return new Promise<T>(
      (
        resolve: (value: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void
      ) => {
        try {
          if (this.webSocket) {
            if (this.webSocket.readyState === this.webSocket.OPEN) {
              msg.internal_command_uuid = uuidv4();
              this.commandCallbacks.set(msg.internal_command_uuid, {
                success: resolve,
                failure: reject,
              });
              this.webSocket.send(JSON.stringify(msg));
            } else {
              reject('Fail to send to websocket (ws is closed)');
            }
          } else {
            reject('Fail to send to websocket (ws is null)');
          }
        } catch (ex) {
          reject('Fail to send websocket ' + ex);
        }
      }
    );
  }

  public sendBinary<T>(
    command: any,
    frameType: BinaryFrameCommand,
    data: Uint8Array
  ): Promise<T> {
    return new Promise<T>(
      (
        resolve: (value: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void
      ) => {
        try {
          if (this.webSocket) {
            if (this.webSocket.readyState === this.webSocket.OPEN) {
              // complete command with uuid
              const uuid = uuidv4();
              command.internal_command_uuid = uuid;

              // stringify the command into an header array
              const header = new Uint8Array(
                this.str2ab(JSON.stringify(command))
              );

              // make the frame to send
              // Content:
              //  frame type : 1 byte
              //  header length : 4 bytes
              //  header (json string) : hn bytes
              //  data size : 4 bytes
              //  data : dn bytes
              const frame: Uint8Array = new Uint8Array(
                1 + 4 + header.byteLength + 4 + data.byteLength
              );

              // setup frame type
              frame[0] = frameType.valueOf(); // type write

              // setup header size
              frame.set(this.numberToUint8Array(header.byteLength), 1);

              // setup header
              frame.set(new Uint8Array(header.buffer), 5);

              // setup data size
              frame.set(
                this.numberToUint8Array(data.byteLength),
                5 + header.length
              );

              // setup data
              frame.set(data, 5 + header.length + 4);

              this.commandCallbacks.set(uuid, {
                success: resolve,
                failure: reject,
              });
              this.webSocket.send(frame);
            } else {
              reject('Fail to send binary to websocket (ws is closed)');
            }
          } else {
            reject('Fail to send binary to websocket (ws is null)');
          }
        } catch (ex) {
          reject('Fail to send binary websocket ' + ex);
        }
      }
    );
  }

  private numberToUint8Array(value: number): Uint8Array {
    const result: Uint32Array = new Uint32Array(1);
    result[0] = value;
    return new Uint8Array(result.buffer);
  }

  private str2ab(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  /**
   * Restart connection attempts
   * @type {function()}
   */
  private restartWebSocketConnection_() {
    this.connect((ws: WebSocket) => {
      this.webSocket = ws;
      this.configureWebSocketHandlers_(ws);
    });
  }

  /**
   * Generate the ports range to connect.
   * @param {number} skip The number of port to skip
   * @param {number} count  The number of ports to generate
   * @return {Array} The array of ports to try
   * @private
   */
  private getPorts_(skip: number, count: number): number[] {
    if (this.portNumberGenerator) {
      return this.portNumberGenerator(skip, count);
    }

    // if not function generator defined, use common port
    const resultingArray = [];
    resultingArray.push(80);
    return resultingArray;
  }

  /**
   * Try to establish connection with websocket
   * @param {Number} port The port to connect to
   * @param {Function} successCallback Callback used when connection is successful
   * @param {Function} errorCallback Callback used when attempt fails
   * @private
   */
  private connectionAttempt_(
    port: number,
    successCallback: (ws: WebSocket, port: number) => void,
    errorCallback: () => void
  ) {
    const url = 'ws://127.0.0.1:' + port + '/ws';
    // var url = 'ws://192.168.73.133:' + port +'/ws';
    console.log('Connecting to : ' + url);
    const ws = new WebSocket(url);

    ws.onerror = () => {
      errorCallback();
    };
    ws.onopen = () => {
      successCallback(ws, port);
    };
  }

  /**
   * Try to establish connection to an array of ports simultaneously
   * @param {Array} ports The array of ports to attempt connection
   * @param {Function} successCallback Callback used when one of connection attempt is successful
   * @param {Function} errorCallback Callback used when all attempts fails
   * @private
   */
  private connectionAttempts_(
    ports: number[],
    successCallback: (ws: WebSocket) => void,
    errorCallback: () => void
  ) {
    let attemptFailCount = 0;
    ports.forEach((port: number) => {
      this.connectionAttempt_(
        port,
        (websocket: WebSocket) => {
          attemptFailCount = 0;
          this.connectedToPort = port; // save the valid port number (for further retry)
          successCallback(websocket);
        },
        () => {
          attemptFailCount++;
          if (attemptFailCount >= ports.length) {
            errorCallback();
          }
        }
      );
    });
  }

  /**
   * Try to establish connection from ports[portIndex .. portIndex+count]
   * @param {Number} portIndex The fisrst port index
   * @param {Number} count The count of simultaneous port attempts
   * @param {Function} callback The callback for success connection
   * @private
   */
  private attemptNext_(
    portIndex: number,
    count: number,
    callback: (ws: WebSocket) => void
  ) {
    // ensure count is not too
    if (portIndex + count > this.maxPorts) {
      count = this.maxPorts - portIndex;
    }

    const ports = this.getPorts_(portIndex, count);
    this.connectionAttempts_(ports, callback, () => {
      if (portIndex + count >= this.maxPorts) {
        if (!this.isStopRequested) {
          setTimeout(() => {
            this.connect(callback);
          }, 5000);
        }
      } else {
        setTimeout(() => {
          // try next ones
          this.attemptNext_(portIndex + count, count, callback);
        }, 1);
      }
    });
  }

  /**
   * Establish connection using the ports list strategy.
   * @param {Function} callback The callback for success connection
   * @private
   */
  private connect(callback: (ws: WebSocket) => void): void {
    if (this.connectedToPort !== 0) {
      // if the connexion has been made once, just wait for server to restart (retry on the same port)
      this.connectionAttempts_([this.connectedToPort], callback, () => {
        this.connect(callback);
      });
    } else {
      // assert(self.maxPorts_ >= 1, 'The maximum number of ports to attempt must be >1');
      // try connect on first port only
      const ports = this.portNumberGenerator(0, 1);
      this.connectionAttempts_(ports, callback, () => {
        this.attemptNext_(1, 5, callback);
      });
    }
  }

  /**
   * Configure the websocket handlers
   * @param {Object} ws The websocket to configure
   * @private
   */
  private configureWebSocketHandlers_(ws: WebSocket) {
    // assert(!isNullOrUndefined(ws), 'The websocket should not be null');

    // success
    this.onConnectStateChange(true);

    ws.onerror = () => {
      if (this.onConnectStateChange) {
        this.onConnectStateChange(false);
      }
      this.webSocket = undefined;
      this.restartWebSocketConnection_();
    };

    ws.onclose = (event: CloseEvent) => {
      let reason;

      // See http://tools.ietf.org/html/rfc6455#section-7.4.1
      if (event.code === 1000) {
        reason =
          'Normal closure, meaning that the purpose for which the connection was established has been fulfilled.';
      } else if (event.code === 1001) {
        reason =
          'An endpoint is "going away", such as a server going down or a browser having navigated away from a page.';
      } else if (event.code === 1002) {
        reason =
          'An endpoint is terminating the connection due to a protocol error';
      } else if (event.code === 1003) {
        reason =
          'An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).';
      } else if (event.code === 1004) {
        reason =
          'Reserved. The specific meaning might be defined in the future.';
      } else if (event.code === 1005) {
        reason = 'No status code was actually present.';
      } else if (event.code === 1006) {
        reason =
          'The connection was closed abnormally, e.g., without sending or receiving a Close control frame';
      } else if (event.code === 1007) {
        reason =
          'An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).';
      } else if (event.code === 1008) {
        reason =
          'An endpoint is terminating the connection because it has received a message that "violates its policy". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.';
      } else if (event.code === 1009) {
        reason =
          'An endpoint is terminating the connection because it has received a message that is too big for it to process.';
      } else if (event.code === 1010) {
        // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
        reason =
          "An endpoint (client) is terminating the connection because it has expected the server to negotiate \
                          one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br />\
                           Specifically, the extensions that are needed are: " +
          event.reason;
      } else if (event.code === 1011) {
        reason =
          'A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.';
      } else if (event.code === 1015) {
        reason =
          "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
      } else {
        reason = 'Unknown reason';
      }

      // notify listeners
      if (this.onConnectStateChange) {
        this.onConnectStateChange(false, event.code, reason);
      }

      // restart connection
      this.restartWebSocketConnection_();
    };

    ws.onmessage = (evt: MessageEvent) => {
      if (evt.data instanceof Blob) {
        // manage blob
        const fileReader = new FileReader();
        fileReader.onloadend = (ev: ProgressEvent) => {
          const contents: any = ev.target;
          const content: Uint8Array = new Uint8Array(contents.result);
          // content[0] = type of frame
          let commandUuid = '';
          if (content[1] !== 0) {
            // parse UUID from data
            const uuidArray = Array.from(content.subarray(2, 2 + content[1]));
            commandUuid = String.fromCharCode.apply(null, uuidArray);
          }
          // send result
          this.notifySuccess(
            commandUuid,
            new Blob([content.subarray(2 + content[1])], {
              type: 'application/octet-stream',
            })
          );
        };

        fileReader.onerror = fileReader.onabort = () => {
          this.notifyReject('', 'Can not read binary data from websocket');
        };

        fileReader.readAsArrayBuffer(evt.data);
      } else {
        const msg = JSON.parse(evt.data);
        if (!msg.result) {
          this.notifyReject(msg.internal_command_uuid, msg.message);
        } else {
          if (msg.data) {
            // format message
            const data = JSON.parse(msg.data);

            // notify listeners
            this.notifySuccess(msg.internal_command_uuid, data);
          } else {
            this.notifySuccess(msg.internal_command_uuid, null);
          }
        }
      }
    };
  }

  /**
   * Notify listeners (either by callback, or by observers)
   * @param uuid The command uuid
   * @param data The data
   */
  private notifySuccess<T>(uuid: string, data: T) {
    if (
      uuid != undefined &&
      uuid != null &&
      this.commandCallbacks.has(uuid) &&
      this.commandCallbacks.get(uuid) != null
    ) {
      this.commandCallbacks.get(uuid)?.success(data);
      this.commandCallbacks.delete(uuid);
    } else {
      if (this.onMessage) {
        this.onMessage(data);
      }
    }
  }

  /**
   * Notify listeners (only by callback, observers are only for success)
   * @param uuid The command uuid
   * @param reason The failure reason
   */
  private notifyReject(uuid: string, reason?: any) {
    if (
      uuid != null &&
      this.commandCallbacks.has(uuid) &&
      this.commandCallbacks.get(uuid) != null
    ) {
      this.commandCallbacks.get(uuid)?.failure(reason);
      this.commandCallbacks.delete(uuid);
    }
  }
}
