import { Box, Button, Flex, Group, Skeleton, Text, Title } from '@mantine/core';
import { IconHomePlus, IconHomeSearch } from '@tabler/icons-react';
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
import { BreadCrumbs, PluginIcon } from '@yadoms/shared';
import {
  AvailablePluginsEntity,
  pluginsApi,
  PluginsInstancesEntity,
} from '@yadoms/domain/plugins';
import CreateNewPlugin from '../create-new-plugin/create-new-plugin';
import { PluginInstanceModal } from '../plugin-instance-modal/plugin-instance-modal';
import { PluginStateBadge } from './plugin-state';
import classes from './plugins.module.css';

const PLUGINS_INSTANCES_QUERY_KEY = ['plugins-instances', 'all'];
const AVAILABLE_PLUGINS_QUERY_KEY = ['plugins', 'all'];

export function Plugins() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedInstanceId, setSelectedInstanceId] = useState<number>();
  const [isCreatePluginModalOpened, setCreatePluginModalOpened] =
    useState(false);

  const pluginsInstancesQuery = useQuery({
    queryKey: PLUGINS_INSTANCES_QUERY_KEY,
    queryFn: () => pluginsApi.getAllPluginsInstances(),
  });

  const availablePluginsQuery = useQuery({
    queryKey: AVAILABLE_PLUGINS_QUERY_KEY,
    queryFn: () => pluginsApi.getAvailablePlugins(),
  });

  const availablePlugins = useMemo(
    () =>
      new Map<string, AvailablePluginsEntity>(
        (availablePluginsQuery.data ?? []).map((plugin) => [
          plugin.type,
          plugin,
        ])
      ),
    [availablePluginsQuery.data]
  );

  const columns = useMemo<MRT_ColumnDef<PluginsInstancesEntity>[]>(
    () => [
      {
        accessorKey: 'displayName',
        header: t('plugins.home.name'),
      },
      {
        id: 'plugin',
        header: t('plugins.home.plugin'),
        accessorFn: (instance) =>
          availablePlugins.get(instance.type)?.name ?? instance.type,
        Cell: ({ row }) => (
          <Group gap="xs" wrap="nowrap">
            <PluginIcon pluginType={row.original.type} />
            <Text size="sm">
              {availablePlugins.get(row.original.type)?.name ??
                row.original.type}
            </Text>
          </Group>
        ),
      },
      {
        accessorKey: 'state',
        header: t('plugins.home.state'),
        Cell: ({ row }) => <PluginStateBadge state={row.original.state} />,
      },
    ],
    [availablePlugins, t]
  );

  const breadcrumbsItem = [
    { title: 'home', href: '#' },
    { title: 'plugins', href: '#' },
  ];

  const icons: Partial<MRT_Icons> = {
    IconSearch: () => <IconHomeSearch />,
  };

  const table = useMantineReactTable({
    columns,
    data: pluginsInstancesQuery.data ?? [],
    enableColumnOrdering: true,
    enableTopToolbar: true,
    enableToolbarInternalActions: false,
    initialState: {
      showGlobalFilter: true,
    },
    icons,
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => setSelectedInstanceId(row.original.id),
      style: { cursor: 'pointer' },
    }),
    renderTopToolbar: ({ table }) => (
      <Flex className={classes.flex}>
        <MRT_GlobalFilterTextInput table={table} />
        <Box>
          <Button
            leftSection={<IconHomePlus />}
            onClick={() => setCreatePluginModalOpened(true)}
          >
            {t('plugins.home.create-new-plugin-btn')}
          </Button>
        </Box>
      </Flex>
    ),
  });

  const selectedInstance = pluginsInstancesQuery.data?.find(
    (instance) => instance.id === selectedInstanceId
  );

  return (
    <Flex direction="column">
      <BreadCrumbs breadcrumbsItems={breadcrumbsItem} />

      <Title order={3} size="h3" m="md">
        {t('plugins.home.description')}
      </Title>

      {isCreatePluginModalOpened && (
        <CreateNewPlugin
          opened={isCreatePluginModalOpened}
          onClose={() => setCreatePluginModalOpened(false)}
        />
      )}

      <Skeleton visible={pluginsInstancesQuery.isLoading}>
        <MantineReactTable table={table} />
      </Skeleton>

      {selectedInstance && (
        <PluginInstanceModal
          key={selectedInstance.id}
          instance={selectedInstance}
          plugin={availablePlugins.get(selectedInstance.type)}
          onClose={() => setSelectedInstanceId(undefined)}
          onInstanceChanged={() =>
            queryClient.invalidateQueries({
              queryKey: PLUGINS_INSTANCES_QUERY_KEY,
            })
          }
        />
      )}
    </Flex>
  );
}

export default Plugins;
