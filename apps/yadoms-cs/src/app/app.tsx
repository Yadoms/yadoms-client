import { MantineProvider } from '@mantine/core';
import MainAppShell from './app-shell/main-app-shell';
import { useState } from 'react';
import { useColorScheme } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

export default function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <MainAppShell />
      </ModalsProvider>
    </MantineProvider>
  );
}
