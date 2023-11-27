import { createContext, useEffect, useRef, useState } from 'react';

class YadomsWebSocketConnection {

  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket('ws://127.0.0.1:8080/ws/v2'); //TODO rendre URL dynamique

    this.ws.onopen = () => this.onConnected?.(true)
    this.ws.onclose = () => this.onConnected?.(false)
    this.ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if (!("newAcquisition" in data))
        return;
      const newAcquisition: Acquisition = { date: data.newAcquisition.date, keyword: data.newAcquisition.keywordId, value: data.newAcquisition.value };
      this.onNewAcquisition?.(newAcquisition);
    }
  }

  filterAcquisitions(keywords: number[]) {
    this.ws.send(JSON.stringify({ "acquisitionFilter": { "keywords": keywords } }));
  }

  onConnected: Function | undefined;//TODO à typer
  onNewAcquisition: Function | undefined; //TODO à typer
}




export type ThemeValues = "light" | "dark";

export interface ITheme {
  value: ThemeValues;
}
export interface Acquisition {
  date: Date;
  keyword: number;
  value: string;
}
export type MyThemeType = {
  theme: ITheme;
  changeTheme: (theme: ITheme) => void;
  connected: boolean;
  acquisitions: Acquisition[];
  filterAcquisitions: (keywords: number[]) => void;
}
export const MyThemeContext = createContext<MyThemeType | null>(null);

const MyThemeContextTypeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<ITheme>({ value: "light" });
  const [connected, setConnected] = useState<boolean>(false);
  const [acquisitions, setAcquisitions] = useState<Acquisition[]>([]);

  const updateTheme = (t: ITheme) => {
    const newTheme: ITheme = { value: t.value };
    setTheme(newTheme);
  }

  function filterAcquisitions(keywords: number[]): void {
    ws.current?.filterAcquisitions(keywords);
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
    <MyThemeContext.Provider value={{ theme: theme, changeTheme: updateTheme, connected: connected, acquisitions: acquisitions, filterAcquisitions: filterAcquisitions }}>
      {children}
    </MyThemeContext.Provider>
  );
};

export default MyThemeContextTypeProvider;




