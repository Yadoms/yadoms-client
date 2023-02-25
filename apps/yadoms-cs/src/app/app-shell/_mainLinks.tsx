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
  IconScript,
  IconSettingsAutomation
} from '@tabler/icons-react';
import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  route: string;
}

function MainLink({ icon, color, label, route }: MainLinkProps) {
  return (
    <UnstyledButton
      component={Link} to={route}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
        }
      })}
    >
      <Group >
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { icon: <IconHome2 size={16} />, color: 'blue', label: 'Accueil',route: '/' },
  { icon: <IconListCheck size={16} />, color: 'teal', label: 'Résumé',route: '#' },
  { icon: <IconSettingsAutomation size={16} />, color: 'violet', label: 'Configuration système',route: '#' },
  { icon: <IconPlugConnectedX size={16} />, color: 'grape', label: 'Plugins',route: '/plugins' },
  { icon: <IconDevices2 size={16} />, color: 'blue', label: 'Equipements',route: '#' },
  { icon: <IconScript size={16} />, color: 'teal', label: `Centre d'automatisation`,route: '#' },
  { icon: <IconMailForward size={16} />, color: 'violet', label: `Destinataires`,route: '#' },
  { icon: <IconAdjustments size={16} />, color: 'grape', label: `Installation & Mise à jour`,route: '#' },
  { icon: <IconHomeCog size={16} />, color: 'blue', label: `Maintenance`,route: '#' },
  { icon: <IconAt size={16} />, color: 'teal', label: `A propos`,route: '#' }
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
