import React from 'react';
import {
  IconAdjustments,
  IconAt,
  IconDevices2,
  IconHome2,
  IconHomeCog,
  IconListCheck,
  IconMailForward,
  IconPlugConnectedX,
  IconRobot,
  IconSettingsAutomation,
} from '@tabler/icons-react';
import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  route: string;
}

function MainLink({ icon, color, label, route }: MainLinkProps) {
  const { t, i18n } = useTranslation();
  return (
    <UnstyledButton
      component={Link}
      to={route}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">{t(`side-bar.${label}`)}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <IconHome2 size={16} />,
    color: 'blue',
    label: 'home',
    route: '/',
  },
  {
    icon: <IconListCheck size={16} />,
    color: 'teal',
    label: 'summary',
    route: '#',
  },
  {
    icon: <IconSettingsAutomation size={16} />,
    color: 'violet',
    label: 'system-configuration',
    route: '#',
  },
  {
    icon: <IconPlugConnectedX size={16} />,
    color: 'grape',
    label: 'plugins',
    route: '/plugins',
  },
  {
    icon: <IconDevices2 size={16} />,
    color: 'blue',
    label: 'devices',
    route: '#',
  },
  {
    icon: <IconRobot size={16} />,
    color: 'teal',
    label: `automation-center`,
    route: '#',
  },
  {
    icon: <IconMailForward size={16} />,
    color: 'violet',
    label: `recipients`,
    route: '#',
  },
  {
    icon: <IconAdjustments size={16} />,
    color: 'grape',
    label: `install-and-update`,
    route: '#',
  },
  {
    icon: <IconHomeCog size={16} />,
    color: 'blue',
    label: `maintenance`,
    route: '#',
  },
  {
    icon: <IconAt size={16} />,
    color: 'teal',
    label: `about`,
    route: '#',
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
