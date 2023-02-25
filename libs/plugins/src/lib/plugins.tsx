import {
  ActionIcon,
  Anchor,
  Badge,
  Breadcrumbs,
  Button,
  Checkbox,
  Flex,
  Group,
  Image,
  Input,
  ScrollArea,
  Table,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import {
  IconDotsVertical,
  IconHome2,
  IconHomePlus,
  IconHomeSearch,
  IconInfoCircle,
  IconPencil,
  IconPower,
  IconSettings,
  IconTrash
} from '@tabler/icons-react';

/* eslint-disable-next-line */
export interface PluginsProps {
}

interface UsersTableProps {
  data: { name: string; pluginType: string; automaticStartup: boolean; state: string }[];
}

const stateColors: Record<string, string> = {
  up: 'green',
  stopped: 'red',
  down: 'pink'
};

const data = [
  {
    'avatar': 'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    'name': 'EnOcean',
    'automaticStartup': false,
    'state': 'up'
  },
  {
    'avatar': 'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    'name': 'OneWire',
    'automaticStartup': true,
    'state': 'stopped'
  }
];

export function Plugins(props: PluginsProps) {
  const theme = useMantineTheme();
  const rows = data.map((item) => (
    <tr key={item.name}>
      <td>
        <Image
          width={200}
          height={50}
          fit="contain"
          src={'https://www.iotone.com/files/vendor/logo_EnOceanLogo4cSolo.jpg'}
          alt="With default placeholder"
          withPlaceholder />
      </td>
      <td>
        <Text size="sm" weight={500}>
          {item.name}
        </Text>
      </td>

      <td>
        <Checkbox size="sm" color="dimmed">
          {item.automaticStartup}
        </Checkbox>
      </td>
      <td>
        <Badge
          color={stateColors[item.state.toLowerCase()]}
          variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
        >
          {item.state}
        </Badge>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPower size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  const breadcrumbsItem = [
    { title: 'Yadoms', href: '#' },
    { title: 'Plugins', href: '#' }
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Flex direction="column">
      <Flex align={'flex-end'}>
        <IconHome2 color={'#1c7ed6'}></IconHome2>
        <Breadcrumbs separator="→">{breadcrumbsItem}</Breadcrumbs>
      </Flex>


      <Title order={3} size="h3" mt="md">
        Gérer, ajouter et supprimer des plugins
      </Title>

      <Flex justify={'space-between'} align={'center'} mt="md">
        <Flex align={'center'}>
          <Input
            icon={<IconHomeSearch />}
            placeholder="chercher un plugin"
            radius="md"
            mr="md"
          />
          <ActionIcon>
            <IconSettings size={30} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size={30} stroke={1.5} />
          </ActionIcon>
          <ActionIcon>
            <IconInfoCircle size={30} stroke={1.5} />
          </ActionIcon>
          <ActionIcon>
            <IconDotsVertical size={30} stroke={1.5} />
          </ActionIcon>
        </Flex>
        <Button leftIcon={<IconHomePlus />}>
          Créer un plugin
        </Button>

      </Flex>
      <ScrollArea mt="md">
        <Table sx={{ minWidth: 800, background: 'white', borderRadius: 10 }} verticalSpacing="xs" highlightOnHover>
          <thead>
          <tr>
            <th>Type de plugin</th>
            <th>Nom</th>
            <th>Démarrer automatiquement</th>
            <th>Etat</th>
            <th />
          </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Flex>

  );
}

export default Plugins;
