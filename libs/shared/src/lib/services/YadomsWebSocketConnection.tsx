import { createContext, useEffect, useRef, useState } from 'react';

class YadomsWebSocketConnection {

  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket('ws://127.0.0.1:8080/ws/v2'); //TODO rendre URL dynamique

    this.ws.onopen = () => this.onConnected?.(true)
    this.ws.onclose = () => this.onConnected?.(false)
    this.ws.onmessage = (event: any) => this.onNewAcquisition?.(event.data)
  }

  filterAcquisitions(keywords: number[]) {
    this.ws.send(JSON.stringify({ "acquisitionFilter": { "keywords": keywords } }));
  }

  onConnected: Function | undefined;
  onNewAcquisition: Function | undefined;
}




export type ThemeValues = "light" | "dark";

export interface ITheme {
  value: ThemeValues;
}
export type MyThemeType = {
  theme: ITheme;
  changeTheme: (theme: ITheme) => void;
  connected: boolean;
  filterAcquisitions: (keywords: number[]) => void;
}
export const MyThemeContext = createContext<MyThemeType | null>(null);

const MyThemeContextTypeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<ITheme>({ value: "light" });
  const [connected, setConnected] = useState<boolean>(false);

  const updateTheme = (t: ITheme) => {
    const newTheme: ITheme = { value: t.value };
    setTheme(newTheme);
  }

  function filterAcquisitions(keywords: number[]): void {
    ws.current?.filterAcquisitions(keywords);
  }

  const onNewAcquisition = (event: MessageEvent) => {
    console.log(event)
  }

  const ws = useRef<YadomsWebSocketConnection | null>(null);
  useEffect(() => {
    const yadomsWebSocketConnection = new YadomsWebSocketConnection();

    yadomsWebSocketConnection.onConnected = (connected: boolean) => setConnected(connected);
    yadomsWebSocketConnection.onNewAcquisition = (event: MessageEvent) => onNewAcquisition(event);

    ws.current = yadomsWebSocketConnection;

    return () => {      //TODO utile ?
      ws.current = null;
    };
  }, []);

  return (
    <MyThemeContext.Provider value={{ theme: theme, changeTheme: updateTheme, connected: connected, filterAcquisitions: filterAcquisitions }}>
      {children}
    </MyThemeContext.Provider>
  );
};

export default MyThemeContextTypeProvider;




