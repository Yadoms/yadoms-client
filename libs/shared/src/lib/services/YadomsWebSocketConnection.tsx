import { createContext, useState } from 'react';
import useWebSocket from 'react-use-websocket';



export type ThemeValues = "light" | "dark";

export interface ITheme {
  value: ThemeValues;
}
export type MyThemeType = {
  theme: ITheme;
  changeTheme: (theme: ITheme) => void;
}
export const MyThemeContext = createContext<MyThemeType | null>(null);

const MyThemeContextTypeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<ITheme>({ value: "light" });

  const updateTheme = (t: ITheme) => {
    const newTheme: ITheme = { value: t.value };
    setTheme(newTheme);
  }

  return (
    <MyThemeContext.Provider value={{ theme: theme, changeTheme: updateTheme }}>
      {children}
    </MyThemeContext.Provider>
  );
};

export default MyThemeContextTypeProvider;



// export class YadomsWebSocketConnection {

//   ws: any;

//   constructor() {
//     this.ws = useWebSocket('ws://127.0.0.1:8080/ws/v2', { //TODO rendre URL dynamique
//       share: true,
//       onOpen: () => console.log('opened'),
//       onMessage: (event) => {
//         console.log(event);
//         if (this.onEvent)
//           this.onEvent(event);
//       },

//       // const {
//       //   sendMessage,
//       //   sendJsonMessage,
//       //   lastMessage,
//       //   lastJsonMessage,
//       //   readyState,
//       //   getWebSocket,
//       // } = useWebSocket('ws://127.0.0.1:8080/ws/v2', { //TODO rendre URL dynamique
//       //   onOpen: () => console.log('opened'),
//       //   onMessage: (event) => {
//       //     console.log(event);
//       //     if (this.onEvent)
//       //       this.onEvent(event);
//       //   },
//       //Will attempt to reconnect on all close events, such as server shutting down
//       shouldReconnect: (closeEvent) => true,
//     });
//   }

//   filterAcquisitions(keywords: number[]) {
//     this.ws.sendJsonMessage({ "acquisitionFilter": { "keywords": keywords } });

//   }

//   onEvent: Function | undefined;


// }
