import { useContext } from "react";
import { MyThemeContext, MyThemeType, ThemeValues } from 'libs/shared/src/lib/services/YadomsWebSocketConnection'

/* eslint-disable-next-line */
export interface PagesHomeProps { }

export function Home(props: PagesHomeProps) {
  const { theme, changeTheme } = useContext(MyThemeContext) as MyThemeType;

  function updateTheme(newThemeValue: ThemeValues) {
    changeTheme({ value: newThemeValue });
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
    </div>
  );
}

export default Home;
