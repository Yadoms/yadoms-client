import { useContext } from "react";
import { MyThemeContext, MyThemeType, ThemeValues } from 'libs/shared/src/lib/services/YadomsWebSocketConnection'
import {v4 as uuidv4} from "uuid";

/* eslint-disable-next-line */
export interface PagesHomeProps { }

export function Home(props: PagesHomeProps) {
  const { theme, changeTheme, connected, acquisitions, filterAcquisitions } = useContext(MyThemeContext) as MyThemeType;

  function updateTheme(newThemeValue: ThemeValues) {
    changeTheme({ value: newThemeValue });
  }
  function setAcquisitionsFilter(keywords: number[]) {
    filterAcquisitions(keywords);
  }

  return (
    <div>
      <h1>Welcome to PagesHome!</h1>
      <p>The current theme is {theme.value}.</p>
      <button
        onClick={() => {
          updateTheme(theme.value == "light" ? "dark" : "light")
        }}>
        Bouton
      </button>
      <p>Socket is {connected ? "connected" : "DISCONNECTED"}</p>
      <button
        onClick={() => {
          setAcquisitionsFilter([44, 45, 46]);
        }}>
        Filter acquisitions
      </button>
      <h1>Acquisitions</h1>
      {acquisitions.map(a => <p key={uuidv4()}>{a.date.toDateString()} - {a.keyword} - {a.value}</p>)}
    </div>
  );
}

export default Home;
