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
  Skeleton,
  Title,
  useMantineTheme,
} from '@mantine/core';
import {
  IconHome2,
  IconHomePlus,
  IconPencil,
  IconPower,
  IconTrash,
} from '@tabler/icons-react';
import { MantineReactTable, MRT_ColumnDef, MRT_Row } from 'mantine-react-table';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CreateNewPluginModal from '../create-new-plugin-modal/create-new-plugin-modal';
import { openDeleteModal } from '@yadoms/shared';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPluginsInstances,
  getPluginsInstancesLoadingStatus,
  getPluginsInstancesPaging,
  PluginsInstancesEntity,
  selectAllPluginsInstances,
} from '../../redux/plugins-instances.slice';

/* eslint-disable-next-line */
export interface PluginsProps {}

const stateColors: Record<string, string> = {
  up: 'green',
  stopped: 'red',
  down: 'pink',
};

export type Plugin = {
  id: string;
  avatar: string;
  name: string;
  automaticStartup: boolean;
  state: 'up' | 'stopped';
};

const data: Plugin[] = [
  {
    id: '1',
    avatar: 'https://via.placeholder.com/150',
    name: 'EnOcean',
    automaticStartup: false,
    state: 'up',
  },
  {
    id: '2',
    avatar: 'https://via.placeholder.com/150',
    name: 'OneWire',
    automaticStartup: true,
    state: 'stopped',
  },
];

export function Plugins(props: PluginsProps) {
  const dispatch = useDispatch();
  const pluginsInstancesEntities = useSelector(selectAllPluginsInstances);
  const loadingStatus = useSelector(getPluginsInstancesLoadingStatus);
  const paging = useSelector(getPluginsInstancesPaging);

  //optionally, you can manage the row selection state yourself
  const [tableData, setTableData] = useState<PluginsInstancesEntity[]>(
    () => pluginsInstancesEntities
  );

  const setTableDataMemoized = useCallback(setTableData, [setTableData]);

  useEffect(() => {
    dispatch(fetchPluginsInstances({ page: 0, pageSize: 10 }));
  }, [dispatch, setTableDataMemoized]);

  useEffect(() => {
    setTableDataMemoized(pluginsInstancesEntities);
  }, [pluginsInstancesEntities, setTableDataMemoized]);

  const theme = useMantineTheme();
  const columns = useMemo<MRT_ColumnDef<PluginsInstancesEntity>[]>(
    () =>
      [
        {
          accessorKey: 'id',
          header: 'ID',
          enableColumnOrdering: false,
          enableEditing: false, //disable editing on this column
          enableSorting: false,
          size: 80,
        },
        {
          accessorKey: 'type',
          header: 'Type',
          columnDefType: 'display', //turns off data column features like sorting, filtering, etc.
          enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
          Cell: ({ row }) => (
            <Image
              width={120}
              height={50}
              fit="fill"
              src={`http://localhost:8080/rest/v2/plugins?byType=${row.original.displayName}&prop=icon`}
              alt="With default placeholder"
              withPlaceholder
            />
          ),
        },
        {
          accessorKey: 'displayName',
          header: 'Name',
        },
        {
          accessorKey: 'autoStart',
          header: 'Start automatically',
          columnDefType: 'display', //turns off data column features like sorting, filtering, etc.
          enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
          Cell: ({ row }) => (
            <Checkbox
              size="sm"
              color="dimmed"
              defaultChecked={row.original.autoStart}
            />
          ),
        },
        {
          accessorKey: 'state',
          header: 'State',
          // columnDefType: 'display', //turns off data column features like sorting, filtering, etc.
          // enableColumnOrdering: false, //but you can turn back any of those features on if you want like this
          Cell: ({ row }) => (
            <Badge
              color={stateColors[row.original.state.toLowerCase()]}
              variant={theme.colorScheme === 'dark' ? 'light' : 'dot'}
            >
              {row.original.state}
            </Badge>
          ),
        },
      ] as MRT_ColumnDef<(typeof pluginsInstancesEntities)[0]>[],
    [] //end
  );

  const handleDeleteRow = useCallback(
    async (row: MRT_Row<PluginsInstancesEntity>) => {
      const confirmed = await openDeleteModal();
      console.log(confirmed);
      if (!confirmed) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  const [isCreatePluginModelOpened, setCreatePluginModelOpened] =
    useState(false);

  function handleModalClose() {
    setCreatePluginModelOpened(false);
    // Vous pouvez faire ce que vous voulez après la fermeture de la modal
  }

  const breadcrumbsItem = [
    { title: 'Yadoms', href: '#' },
    { title: 'Plugins', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Flex direction="column">
      <Flex align={'flex-end'}>
        <IconHome2 color={'#1c7ed6'}></IconHome2>
        <Breadcrumbs ml={'xs'} separator="→">
          {breadcrumbsItem}
        </Breadcrumbs>
      </Flex>

      <Title order={3} size="h3" mt="md">
        Manage, add and remove plugins
      </Title>

      <Flex justify={'end'} align={'center'} mt="md" mb="md">
        <Button
          leftIcon={<IconHomePlus />}
          onClick={() => setCreatePluginModelOpened(true)}
        >
          Create a plugin
        </Button>
      </Flex>
      {isCreatePluginModelOpened && (
        <CreateNewPluginModal opened={true} onClose={handleModalClose} />
      )}
      <Skeleton visible={loadingStatus === 'loading'}>
        <MantineReactTable
          displayColumnDefOptions={{
            'mrt-row-actions': {
              mantineTableHeadCellProps: {
                align: 'center',
              },
              size: 120,
            },
          }}
          columns={columns}
          data={tableData}
          editingMode="modal" //default
          enableRowSelection
          enableColumnOrdering
          enableEditing
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <Group spacing={3} position="center">
              <ActionIcon>
                <IconPower size={30} stroke={1.5} />
              </ActionIcon>
              <ActionIcon onClick={() => table.setEditingRow(row)}>
                <IconPencil size={30} stroke={1.5} />
              </ActionIcon>
              <ActionIcon color="red" onClick={() => handleDeleteRow(row)}>
                <IconTrash size={30} stroke={1.5} />
              </ActionIcon>
            </Group>
          )}
        />
      </Skeleton>
    </Flex>
  );
}

export default Plugins;
