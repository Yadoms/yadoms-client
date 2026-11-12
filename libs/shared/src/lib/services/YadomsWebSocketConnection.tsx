import { createContext, useEffect, useRef, useState } from 'react';
import { parseYadomsDate } from '../yadoms-utils';

export interface Acquisition {
  date: Date;
  keyword: number;
  value: string;
}

export interface AcquisitionListener {
  uuid: string;
  onReceived(newAcquisition: Acquisition): void;
}

const RECONNECT_DELAY_MS = 5000;

class YadomsWebSocketConnection {
  private _ws!: WebSocket;
  private _connected = false;
  private _closed = false;
  private _reconnectTimer: ReturnType<typeof setTimeout> | undefined;
  private _acquisitionsListeners = new Map<number, AcquisitionListener[]>();

  constructor() {
    this.connect();
  }

  close() {
    this._closed = true;
    clearTimeout(this._reconnectTimer);
    this._ws.close();
  }

  private connect() {
    this._ws = new WebSocket('ws://127.0.0.1:8080/ws/v2'); //TODO rendre URL dynamique

    this._ws.onopen = () => {
      this._connected = true;
      this.onConnected?.(this._connected);
      this.updateKeywordsFilter();
    };

    this._ws.onclose = () => {
      if (this._closed) return;
      this._connected = false;
      this.onConnected?.(this._connected);
      this._reconnectTimer = setTimeout(
        () => this.connect(),
        RECONNECT_DELAY_MS
      );
    };

    this._ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if ('serverCurrentTime' in data) {
        this.onServerCurrenTime?.(parseYadomsDate(data.serverCurrentTime));
        return;
      }
      if ('newAcquisition' in data) {
        const newAcquisition: Acquisition = {
          date: parseYadomsDate(data.newAcquisition.date),
          keyword: data.newAcquisition.keywordId,
          value: data.newAcquisition.value,
        };
        this._acquisitionsListeners
          .get(newAcquisition.keyword)
          ?.forEach((listener) => {
            listener.onReceived(newAcquisition);
          });
        return;
      }
      console.warn('Unknown socket message received : ' + event);
    };
  }

  subscribeToKeywordAcquisitions(
    keywords: number[],
    newListener: AcquisitionListener
  ) {
    // Cleanup previous listeners
    this._acquisitionsListeners.forEach(
      (listeners: AcquisitionListener[], key: number) => {
        listeners.forEach(
          (listener: AcquisitionListener, listenerIndex: number) => {
            if (listener.uuid === newListener.uuid)
              listeners.splice(listenerIndex, 1);
          }
        );
      }
    );

    keywords.forEach((keyword: number) => {
      const listeners = this._acquisitionsListeners.get(keyword);
      if (listeners === undefined)
        this._acquisitionsListeners.set(keyword, [newListener]);
      else listeners.push(newListener);
    });

    if (this._connected) this.updateKeywordsFilter();
  }

  private updateKeywordsFilter() {
    if (this._acquisitionsListeners.size == 0) return;
    this.filterAcquisitions([...this._acquisitionsListeners.keys()]);
  }

  private filterAcquisitions(keywords: number[]) {
    this._ws.send(
      JSON.stringify({ acquisitionFilter: { keywords: keywords } })
    );
  }

  onConnected: ((connected: boolean) => void) | undefined;
  onServerCurrenTime: ((serverTime: Date) => void) | undefined;
}

export type YadomsConnection = {
  connected: boolean | undefined;
  serverCurrentTime: Date | undefined;
  subscribeToKeywordAcquisitions: (
    keywords: number[],
    onNewAcquisition: AcquisitionListener
  ) => void;
};
export const YadomsConnectionContext = createContext<YadomsConnection | null>(
  null
);

export const YadomsConnectionContextProvider = ({ children }: any) => {
  const [connected, setConnected] = useState<boolean>();
  const [serverCurrentTime, setServerCurrentTime] = useState<Date>();

  function subscribeToKeywordAcquisitions(
    keywords: number[],
    onNewAcquisition: AcquisitionListener
  ): void {
    ws.current?.subscribeToKeywordAcquisitions(keywords, onNewAcquisition);
  }

  const ws = useRef<YadomsWebSocketConnection | null>(null);
  useEffect(() => {
    const yadomsWebSocketConnection = new YadomsWebSocketConnection();
    yadomsWebSocketConnection.onConnected = (connected: boolean) =>
      setConnected(connected);
    yadomsWebSocketConnection.onServerCurrenTime = (serverTime: Date) =>
      setServerCurrentTime(serverTime);

    ws.current = yadomsWebSocketConnection;

    return () => yadomsWebSocketConnection.close();
  }, []);

  return (
    <YadomsConnectionContext.Provider
      value={{
        connected: connected,
        serverCurrentTime: serverCurrentTime,
        subscribeToKeywordAcquisitions: subscribeToKeywordAcquisitions,
      }}
    >
      {children}
    </YadomsConnectionContext.Provider>
  );
};
