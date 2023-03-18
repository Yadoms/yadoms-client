import {
  AppShell,
  Navbar,
  Header,
  ActionIcon,
  Group,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { MainLinks } from './_mainLinks';
import { User } from './_user';
import { Logo } from './_logo';
import { Plugins } from '@yadoms/plugins';
import { Routes, Route } from 'react-router-dom';
import { Home } from '@yadoms/home';
import { Summary } from '@yadoms/summary';

function MainAppShell() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={
        <Navbar width={{ base: 300 }} height={'calc(100vh - 60px)'} p="xs">
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group sx={{ height: '100%' }} px={20} position="apart">
            <Logo colorScheme={colorScheme} />
            <ActionIcon
              variant="default"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              size={30}
            >
              {colorScheme === 'dark' ? (
                <IconSun size={16} />
              ) : (
                <IconMoonStars size={16} />
              )}
            </ActionIcon>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/plugins" element={<Plugins />} />
      </Routes>
    </AppShell>
  );
}

export default MainAppShell;
