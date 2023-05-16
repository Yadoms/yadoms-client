import {
  ActionIcon, Burger,
  Center,
  createStyles,
  Flex,
  Group,
  Header,
  Navbar, Paper,
  rem,
  Stack,
  Tooltip, Transition,
  UnstyledButton,
  useMantineColorScheme
} from "@mantine/core";
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
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Summary } from '@yadoms/pages/summary';
import { Home } from '@yadoms/pages/home';
import { Plugins } from '@yadoms/pages/plugins';
import { useDisclosure } from "@mantine/hooks";

const HEADER_HEIGHT = rem(60);
const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

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
  const { classes, cx } = useStyles();
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
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
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
  const activeIndex = linksData.findIndex(link => link.route === pathname);

  const [active, setActive] = useState(activeIndex);

  const { classes, cx } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);

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
      <Navbar
        height={'100vh'}
        width={{ base: 80 }}
        p="md"
        position={{ top: 0 }}
      >
        <Center>
          <Logo colorScheme={colorScheme} />
        </Center>
        <Navbar.Section grow mt={50}>
          <Stack justify="center" spacing={0}>
            {links}
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            <NavbarLink icon={IconLogout} label="logout" route={'/'} />
          </Stack>
        </Navbar.Section>
      </Navbar>
      <Flex
        direction={'column'}
        sx={(theme) => ({
          width: '100%',
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        })}
      >
        <Header height={60} zIndex={-1}>
          <Group sx={{ height: '100%' }} px={20} position="right">
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
            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
            <Transition transition="pop-top-right" duration={200} mounted={opened}>
              {(styles) => (
                <Paper className={classes.dropdown} withBorder style={styles}>
                  {links}
                </Paper>
              )}
            </Transition>
          </Group>
        </Header>
        <div style={{ padding: '15px' }}>
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
