import {
  Badge,
  Checkbox,
  CloseButton,
  Flex,
  Group,
  Skeleton,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconHomeSearch } from '@tabler/icons-react';
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_Icons,
  useMantineReactTable,
} from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BreadCrumbs, PluginIcon } from '@yadoms/shared';
import { DeviceEntity, devicesApi } from '@yadoms/domain/keywords';
import {
  PluginsInstancesEntity,
  pluginsApi,
  PuginsInstancesState,
  SYSTEM_PLUGIN_INSTANCE_ID,
} from '@yadoms/domain/plugins';
import { DeviceModal } from '../device-modal/device-modal';
import classes from './devices.module.css';

const DEVICES_QUERY_KEY = 'devices';
const PLUGIN_STATE_DEVICE_MODEL = 'Plugin state';
const PLUGIN_INSTANCE_FILTER_PARAM = 'pluginInstance';

export function Devices() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [showBlacklisted, setShowBlacklisted] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number>();
  const [searchParams, setSearchParams] = useSearchParams();
  const pluginInstanceParam = searchParams.get(PLUGIN_INSTANCE_FILTER_PARAM);
  const pluginInstanceFilter =
    pluginInstanceParam === null ? undefined : Number(pluginInstanceParam);

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

  const filteredDevices = useMemo(
    () =>
      (devicesQuery.data ?? []).filter(
        (device) =>
          pluginInstanceFilter === undefined ||
          device.pluginInstance === pluginInstanceFilter
      ),
    [devicesQuery.data, pluginInstanceFilter]
  );

  const clearPluginInstanceFilter = () =>
    setSearchParams((params) => {
      params.delete(PLUGIN_INSTANCE_FILTER_PARAM);
      return params;
    });

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
          const isSystem =
            row.original.pluginInstance === SYSTEM_PLUGIN_INSTANCE_ID;
          if (!instance && !isSystem) return null;
          return (
            <Group gap="xs" wrap="nowrap">
              <PluginIcon pluginType={isSystem ? undefined : instance?.type} />
              <Text size="sm">{instance?.displayName ?? 'System'}</Text>
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
      return true;
    } catch (err) {
      console.error('Device action failed', err);
      notifications.show({ color: 'red', message: t(errorMessageKey) });
      return false;
    } finally {
      await queryClient.invalidateQueries({ queryKey: [DEVICES_QUERY_KEY] });
    }
  };

  const confirmDeleteDevice = (
    device: DeviceEntity,
    onDeleted?: () => void
  ) => {
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
        ).then((deleted) => deleted && onDeleted?.()),
    });
  };

  const openDevice = async (device: DeviceEntity) => {
    if (device.blacklisted || device.model === PLUGIN_STATE_DEVICE_MODEL) {
      notifications.show({
        color: 'orange',
        message: t('devices.home.deviceDeleted'),
      });
      return;
    }

    if (device.pluginInstance !== SYSTEM_PLUGIN_INSTANCE_ID) {
      const { data: instances } = await pluginsInstancesQuery.refetch();
      const instance = instances?.find(
        (pluginInstance) => pluginInstance.id === device.pluginInstance
      );
      if (instance?.state !== PuginsInstancesState.Running) {
        notifications.show({
          color: 'orange',
          message: t('devices.home.pluginStopped'),
        });
        return;
      }
    }

    setSelectedDeviceId(device.id);
  };

  const selectedDevice = devicesQuery.data?.find(
    (device) => device.id === selectedDeviceId
  );

  const breadcrumbsItem = [
    { title: 'home', href: '#' },
    { title: 'devices', href: '#' },
  ];

  const icons: Partial<MRT_Icons> = {
    IconSearch: () => <IconHomeSearch />,
  };

  const table = useMantineReactTable({
    columns,
    data: filteredDevices,
    enableColumnOrdering: true,
    enableTopToolbar: true,
    enableToolbarInternalActions: false,
    initialState: {
      showGlobalFilter: true,
    },
    icons,
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => void openDevice(row.original),
      style: { cursor: 'pointer' },
    }),
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
          {pluginInstanceFilter !== undefined && (
            <Badge
              size="lg"
              variant="light"
              rightSection={
                <CloseButton
                  size="xs"
                  variant="transparent"
                  aria-label={t('devices.home.clearPluginFilter')}
                  onClick={clearPluginInstanceFilter}
                />
              }
            >
              {t('devices.home.pluginFilter', {
                plugin:
                  pluginsInstances.get(pluginInstanceFilter)?.displayName ??
                  pluginInstanceFilter,
              })}
            </Badge>
          )}
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

      {selectedDevice && (
        <DeviceModal
          key={selectedDevice.id}
          device={selectedDevice}
          pluginInstance={pluginsInstances.get(selectedDevice.pluginInstance)}
          onClose={() => setSelectedDeviceId(undefined)}
          onDelete={(device) =>
            confirmDeleteDevice(device, () => setSelectedDeviceId(undefined))
          }
          onDeviceChanged={() =>
            queryClient.invalidateQueries({ queryKey: [DEVICES_QUERY_KEY] })
          }
        />
      )}
    </Flex>
  );
}

export default Devices;
