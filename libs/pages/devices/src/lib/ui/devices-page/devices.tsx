import {
  ActionIcon,
  Badge,
  Checkbox,
  Flex,
  Group,
  Image,
  Skeleton,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import {
  IconHomeSearch,
  IconRestore,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_Icons,
  useMantineReactTable,
} from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance, BreadCrumbs } from '@yadoms/shared';
import { DeviceEntity, devicesApi } from '@yadoms/domain/keywords';
import { PluginsInstancesEntity, pluginsApi } from '@yadoms/domain/plugins';
import classes from './devices.module.css';

const DEVICES_QUERY_KEY = 'devices';
const SYSTEM_DEVICE_ID = 1;

function pluginIconUrl(pluginType: string) {
  return `${axiosInstance.defaults.baseURL}/plugins?byType=${pluginType}&prop=icon`;
}

export function Devices() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showBlacklisted, setShowBlacklisted] = useState(false);

  const devicesQuery = useQuery({
    queryKey: [DEVICES_QUERY_KEY, showBlacklisted],
    queryFn: () => devicesApi.getDevices(showBlacklisted),
  });

  const pluginsInstancesQuery = useQuery({
    queryKey: ['plugins-instances', 'all'],
    queryFn: () => pluginsApi.getAllPluginsInstances(),
  });

  const pluginsInstances = useMemo(
    () =>
      new Map<number, PluginsInstancesEntity>(
        (pluginsInstancesQuery.data ?? []).map((instance) => [
          instance.id,
          instance,
        ])
      ),
    [pluginsInstancesQuery.data]
  );

  const columns = useMemo<MRT_ColumnDef<DeviceEntity>[]>(
    () => [
      {
        accessorKey: 'friendlyName',
        header: t('devices.home.name'),
        Cell: ({ row }) => (
          <Group gap="xs" wrap="nowrap">
            <Text size="sm" c={row.original.blacklisted ? 'dimmed' : undefined}>
              {row.original.friendlyName}
            </Text>
            {row.original.blacklisted && (
              <Badge color="gray" variant="light" size="sm">
                {t('devices.home.blacklisted')}
              </Badge>
            )}
          </Group>
        ),
      },
      {
        accessorKey: 'model',
        header: t('devices.home.model'),
        Cell: ({ row }) => (
          <Text size="sm" className={classes.multiline}>
            {row.original.model}
          </Text>
        ),
      },
      {
        id: 'plugin',
        header: t('devices.home.plugin'),
        accessorFn: (device) =>
          pluginsInstances.get(device.pluginInstance)?.displayName ?? '',
        Cell: ({ row }) => {
          const instance = pluginsInstances.get(row.original.pluginInstance);
          if (!instance) return null;
          return (
            <Group gap="xs" wrap="nowrap">
              <Image
                w={32}
                h={32}
                fit="contain"
                src={pluginIconUrl(instance.type)}
                alt={instance.type}
              />
              <Text size="sm">{instance.displayName}</Text>
            </Group>
          );
        },
      },
    ],
    [pluginsInstances, t]
  );

  const runDeviceAction = async (
    action: () => Promise<void>,
    errorMessageKey: string
  ) => {
    try {
      await action();
    } catch (err) {
      console.error('Device action failed', err);
      notifications.show({ color: 'red', message: t(errorMessageKey) });
    } finally {
      await queryClient.invalidateQueries({ queryKey: [DEVICES_QUERY_KEY] });
    }
  };

  const confirmDeleteDevice = (device: DeviceEntity) => {
    let permanently = false;
    openConfirmModal({
      title: t('devices.home.deleteDevice'),
      centered: true,
      children: (
        <Stack>
          <Text size="sm" className={classes.multiline}>
            {t('devices.home.confirmBlacklistDevice', {
              name: device.friendlyName,
            })}
          </Text>
          <Checkbox
            label={t('devices.home.deletePermanently')}
            onChange={(event) => {
              permanently = event.currentTarget.checked;
            }}
          />
        </Stack>
      ),
      labels: {
        confirm: t('devices.home.delete'),
        cancel: t('devices.home.cancel'),
      },
      confirmProps: { color: 'red' },
      onConfirm: () =>
        void runDeviceAction(
          () =>
            permanently
              ? devicesApi.deleteDevice(device.id)
              : devicesApi.setBlacklisted(device.id, true),
          'devices.home.deleteError'
        ),
    });
  };

  const confirmDeleteBlacklistedDevice = (device: DeviceEntity) => {
    openConfirmModal({
      title: t('devices.home.deletePermanently'),
      centered: true,
      children: (
        <Text size="sm">
          {t('devices.home.confirmDeletePermanently', {
            name: device.friendlyName,
          })}
        </Text>
      ),
      labels: {
        confirm: t('devices.home.delete'),
        cancel: t('devices.home.cancel'),
      },
      confirmProps: { color: 'red' },
      onConfirm: () =>
        void runDeviceAction(
          () => devicesApi.deleteDevice(device.id),
          'devices.home.deleteError'
        ),
    });
  };

  const restoreDevice = (device: DeviceEntity) =>
    runDeviceAction(
      () => devicesApi.setBlacklisted(device.id, false),
      'devices.home.restoreError'
    );

  const configureDevice = (device: DeviceEntity) => {
    console.debug('Configure device', device.id);
  };

  const breadcrumbsItem = [
    { title: 'home', href: '#' },
    { title: 'devices', href: '#' },
  ];

  const icons: Partial<MRT_Icons> = {
    IconSearch: () => <IconHomeSearch />,
  };

  const table = useMantineReactTable({
    columns,
    data: devicesQuery.data ?? [],
    enableRowActions: true,
    enableColumnOrdering: true,
    positionActionsColumn: 'last',
    enableTopToolbar: true,
    enableToolbarInternalActions: false,
    initialState: {
      showGlobalFilter: true,
    },
    icons,
    renderRowActions: ({ row }) =>
      row.original.blacklisted ? (
        <Group gap={3} justify="center" wrap="nowrap">
          <ActionIcon
            variant="subtle"
            aria-label={t('devices.home.restore')}
            onClick={() => void restoreDevice(row.original)}
          >
            <IconRestore size={30} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            aria-label={t('devices.home.deletePermanently')}
            onClick={() => confirmDeleteBlacklistedDevice(row.original)}
          >
            <IconTrash size={30} stroke={1.5} />
          </ActionIcon>
        </Group>
      ) : (
        <Group gap={3} justify="center" wrap="nowrap">
          <ActionIcon
            variant="subtle"
            aria-label={t('devices.home.configure')}
            onClick={() => configureDevice(row.original)}
          >
            <IconSettings size={30} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            aria-label={t('devices.home.delete')}
            disabled={row.original.id === SYSTEM_DEVICE_ID}
            onClick={() => confirmDeleteDevice(row.original)}
          >
            <IconTrash size={30} stroke={1.5} />
          </ActionIcon>
        </Group>
      ),
    renderTopToolbar: ({ table }) => (
      <Flex className={classes.flex}>
        <Group>
          <MRT_GlobalFilterTextInput table={table} />
          <Switch
            label={t('devices.home.showBlacklisted')}
            checked={showBlacklisted}
            onChange={(event) =>
              setShowBlacklisted(event.currentTarget.checked)
            }
          />
        </Group>
      </Flex>
    ),
  });

  return (
    <Flex direction="column">
      <BreadCrumbs breadcrumbsItems={breadcrumbsItem} />

      <Title order={3} size="h3" m="md">
        {t('devices.home.description')}
      </Title>

      <Skeleton visible={devicesQuery.isLoading}>
        <MantineReactTable table={table} />
      </Skeleton>
    </Flex>
  );
}

export default Devices;
