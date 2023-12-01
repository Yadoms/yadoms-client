import { createContext, useEffect, useRef, useState } from 'react';

export interface Acquisition {
  date: Date;
  keyword: number;
  value: string;
}

export interface Device {
  id: number;
  pluginId: number;
  friendlyName: string;
  model: string;
  details: object;
  configuration: object;
  type: string;
  blacklist: boolean;
}

type AcquisitionListeners = (newAcquisition: Acquisition) => void;

class YadomsWebSocketConnection {

  private _ws: WebSocket;
  private _connected: boolean = false;
  private _acquisitionsListeners = new Map<number, AcquisitionListeners[]>();

  constructor() {
    this._ws = new WebSocket('ws://127.0.0.1:8080/ws/v2'); //TODO rendre URL dynamique

    this._ws.onopen = () => {
      this._connected = true;
      this.onConnected?.(this._connected)
      this.updateKeywordsFilter();
    }

    this._ws.onclose = () => {
      this._connected = false;
      this.onConnected?.(this._connected)
    }

    this._ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if ("serverCurrentTime" in data) {
        this.onServerCurrenTime?.(this.parseYadomsDate(data.serverCurrentTime));
        return;
      }
      if ("newAcquisition" in data) {
        const newAcquisition: Acquisition = {
          date: this.parseYadomsDate(data.newAcquisition.date),
          keyword: data.newAcquisition.keywordId,
          value: data.newAcquisition.value
        };
        this._acquisitionsListeners.get(newAcquisition.keyword)?.forEach((listener) => {
          listener(newAcquisition)
        })
        return;
      }
      if ("deviceCreated" in data) {
        const newDevice: Device = this.parseDevice(data.deviceCreated);
        console.log("WS > Device created : " + newDevice.friendlyName); // TODO Just log for now
        return;
      }
      if ("deviceDeleted" in data) {
        const newDevice: Device = this.parseDevice(data.deviceDeleted);
        console.log("WS > Device deleted : " + newDevice.friendlyName); // TODO Just log for now
        return;
      }
      //TODO keywordCreated, keywordDeleted
      console.warn("WS > Unknown socket message received : " + event);
    }
  }

  subscribeToKeywordAcquisitions(keywords: number[], onNewAcquisition: (newAcquisition: Acquisition) => void) {
    keywords.forEach((keyword: number) => {
      const listeners = this._acquisitionsListeners.get(keyword);
      if (listeners === undefined)
        this._acquisitionsListeners.set(keyword, [onNewAcquisition]);
      else
        listeners.push(onNewAcquisition);
    });

    if (this._connected)
      this.updateKeywordsFilter();
  }

  private updateKeywordsFilter() {
    if (this._acquisitionsListeners.size == 0)
      return;
    this.filterAcquisitions([...this._acquisitionsListeners.keys()]);
  }

  private filterAcquisitions(keywords: number[]) {
    this._ws.send(JSON.stringify({ "acquisitionFilter": { "keywords": keywords } }));
  }

  private parseYadomsDate(dateAsString: string): Date {
    return new Date(dateAsString.replace(/([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2}).([0-9]*)/, "$1-$2-$3T$4:$5:$6.$7"));
  }

  private parseDevice(deviceAsJson: any): Device {
    return {
      id: deviceAsJson.Id,
      pluginId: deviceAsJson.PluginId,
      friendlyName: deviceAsJson.FriendlyName,
      model: deviceAsJson.Model,
      details: deviceAsJson.Details,
      configuration: deviceAsJson.Configuration,
      type: deviceAsJson.Type,
      blacklist: deviceAsJson.Blacklist
    };
  }

  onConnected: ((connected: boolean) => void) | undefined;
  onServerCurrenTime: ((serverTime: Date) => void) | undefined;
}



export type YadomsConnection = {
  connected: boolean;
  serverCurrentTime: Date | undefined;
  subscribeToKeywordAcquisitions: (keywords: number[], onNewAcquisition: (newAcquisition: Acquisition) => void) => void;
}
export const YadomsConnectionContext = createContext<YadomsConnection | null>(null);

const YadomsConnectionContextProvider = ({ children }: any) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [serverCurrentTime, setServerCurrentTime] = useState<Date>();

  function subscribeToKeywordAcquisitions(keywords: number[], onNewAcquisition: (newAcquisition: Acquisition) => void): void {
    ws.current?.subscribeToKeywordAcquisitions(keywords, onNewAcquisition);
  }

  const ws = useRef<YadomsWebSocketConnection | null>(null);
  useEffect(() => {
    const yadomsWebSocketConnection = new YadomsWebSocketConnection();
    yadomsWebSocketConnection.onConnected = (connected: boolean) => setConnected(connected);
    yadomsWebSocketConnection.onServerCurrenTime = (serverTime: Date) => setServerCurrentTime(serverTime);

    ws.current = yadomsWebSocketConnection;
  }, []);

  return (
    <YadomsConnectionContext.Provider value={{
      connected: connected,
      serverCurrentTime: serverCurrentTime,
      subscribeToKeywordAcquisitions: subscribeToKeywordAcquisitions
    }}>
      {children}
    </YadomsConnectionContext.Provider>
  );
};

export default YadomsConnectionContextProvider;



