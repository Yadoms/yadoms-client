import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import MainAppShell from "./app-shell/main-app-shell";
import { useState } from "react";

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme: "light" }} withGlobalStyles withNormalizeCSS>
        <MainAppShell />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
