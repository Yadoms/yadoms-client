import { createContext, useEffect, useRef, useState } from 'react';

class YadomsWebSocketConnection {

  private _ws: WebSocket;
  private _connected: boolean = false;
  private _subscribedKeywords: number[] = [];

  constructor() {
    this._ws = new WebSocket('ws://127.0.0.1:8080/ws/v2'); //TODO rendre URL dynamique


    this._ws.onopen = () => {
      this._connected = true;
      this.onConnected?.(this._connected)
      if (this._subscribedKeywords.length != 0)
        this.filterAcquisitions(this._subscribedKeywords);
    }
    this._ws.onclose = () => {
      this._connected = false;
      this.onConnected?.(this._connected)
    }
    this._ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if (!("newAcquisition" in data))
        return;
      const newAcquisition: Acquisition = { date: this.parseYadomsDate(data.newAcquisition.date), keyword: data.newAcquisition.keywordId, value: data.newAcquisition.value };
      this.onNewAcquisition?.(newAcquisition);
    }
  }

  subscribeToKeywordAcquisitions(keywords: number[]) {
    this._subscribedKeywords = [...this._subscribedKeywords, ...keywords];
    if (this._connected)
      this.filterAcquisitions(this._subscribedKeywords);
  }

  private filterAcquisitions(keywords: number[]) { //TODO rendre privé
    this._ws.send(JSON.stringify({ "acquisitionFilter": { "keywords": keywords } }));
  }

  private parseYadomsDate(dateAsString: string): Date {
    return new Date(dateAsString.replace(/([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2}).([0-9]*)/, "$1-$2-$3T$4:$5:$6.$7"));
  }

  onConnected: Function | undefined;//TODO à typer
  onNewAcquisition: Function | undefined; //TODO à typer
}




export interface Acquisition {
  date: Date;
  keyword: number;
  value: string;
}
export type YadomsConnection = {
  connected: boolean;
  acquisitions: Acquisition[];
  subscribeToKeywordAcquisitions: (keywords: number[]) => void;
}
export const YadomsConnectionContext = createContext<YadomsConnection | null>(null);

const MyThemeContextTypeProvider = ({ children }: any) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [acquisitions, setAcquisitions] = useState<Acquisition[]>([]);

  function subscribeToKeywordAcquisitions(keywords: number[]): void {
    ws.current?.subscribeToKeywordAcquisitions(keywords);
  }

  const onNewAcquisition = (newAcquisition: Acquisition) => {
    console.log(newAcquisition.date + " - " + newAcquisition.keyword + " - " + newAcquisition.value);
    setAcquisitions(acquisitions => [...acquisitions, newAcquisition]);
  }

  const ws = useRef<YadomsWebSocketConnection | null>(null);
  useEffect(() => {
    const yadomsWebSocketConnection = new YadomsWebSocketConnection();

    yadomsWebSocketConnection.onConnected = (connected: boolean) => setConnected(connected);
    yadomsWebSocketConnection.onNewAcquisition = (acquisition: Acquisition) => onNewAcquisition(acquisition);

    ws.current = yadomsWebSocketConnection;

    return () => {      //TODO utile ?
      ws.current = null;
    };
  }, []);

  return (
    <YadomsConnectionContext.Provider value={{
      connected: connected,
      acquisitions: acquisitions,
      subscribeToKeywordAcquisitions: subscribeToKeywordAcquisitions
    }}>
      {children}
    </YadomsConnectionContext.Provider>
  );
};

export default MyThemeContextTypeProvider;



