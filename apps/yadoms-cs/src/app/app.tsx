import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import MainAppShell from './app-shell/main-app-shell';
import { useState } from 'react';
import { useColorScheme } from '@mantine/hooks';

export default function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <MainAppShell />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
