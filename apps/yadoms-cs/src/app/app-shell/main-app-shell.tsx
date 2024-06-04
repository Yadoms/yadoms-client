import {
  ActionIcon,
  Center,
  Flex,
  rem,
  Stack,
  Tooltip,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconAdjustments,
  IconAt,
  IconDevices2,
  IconHome2,
  IconHomeCog,
  IconListCheck,
  IconLogout,
  IconMailForward,
  IconMoonStars,
  IconPlugConnectedX,
  IconRobot,
  IconSettingsAutomation,
  IconSun,
} from '@tabler/icons-react';
import { Logo } from './_logo';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Summary } from '@yadoms/pages/summary';
import { Home } from '@yadoms/pages/home';
import { Plugins } from '@yadoms/pages/plugins';
import { useDisclosure } from '@mantine/hooks';
import classes from './MainAppShell.module.css';

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;

  route: string;

  onClick?(): void;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  route,
}: NavbarLinkProps) {
  const { t } = useTranslation();
  return (
    <Tooltip
      label={t(`side-bar.${label}`)}
      position="right"
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        component={Link}
        to={route}
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const linksData = [
  { icon: IconHome2, label: 'home', route: '/' },
  { icon: IconListCheck, label: 'summary', route: '/summary' },
  { icon: IconSettingsAutomation, label: 'system-configuration', route: '/' },
  { icon: IconPlugConnectedX, label: 'plugins', route: '/plugins' },
  { icon: IconDevices2, label: 'devices', route: '/' },
  { icon: IconRobot, label: 'automation-center', route: '/' },
  { icon: IconMailForward, label: 'recipients', route: '/' },
  { icon: IconAdjustments, label: 'install-and-update', route: '/' },
  { icon: IconHomeCog, label: 'maintenance', route: '/' },
  { icon: IconAt, label: 'about', route: '/' },
];

function MainAppShell() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const location = useLocation();
  const { pathname } = location;
  const activeIndex = linksData.findIndex((link) => link.route === pathname);

  const [active, setActive] = useState(activeIndex);

  const links = linksData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Flex direction={'row'}>
      <nav className={classes.navbar}>
        <Center>
          <Logo />
        </Center>

        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>

        <Stack justify="center" gap={0}>
          <NavbarLink icon={IconLogout} label="Logout" route={'/'} />
        </Stack>
      </nav>
      <Flex direction={'column'} style={{ width: '100%' }}>
        <header className={classes.header}>
          <div className={classes.inner}>
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
          </div>
        </header>

        <div style={{ padding: '10px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/plugins" element={<Plugins />} />
          </Routes>
        </div>
      </Flex>
    </Flex>
  );
}

export default MainAppShell;
