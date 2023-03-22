import {
  ActionIcon,
  Badge,
  Box,
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
  IconHomePlus,
  IconHomeSearch,
  IconPencil,
  IconPower,
  IconTrash,
} from '@tabler/icons-react';
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_Row,
  MRT_TableInstance,
  MRT_VisibilityState,
} from 'mantine-react-table';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import CreateNewPlugin from '../create-new-plugin/create-new-plugin';
import { BreadCrumbs, openDeleteModal } from '@yadoms/shared';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPluginsInstances,
  getPluginsInstancesLoadingStatus,
  getPluginsInstancesPaging,
  PluginsInstancesEntity,
  selectAllPluginsInstances,
} from '../../redux/plugins-instances.slice';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface PluginsProps {}

const stateColors: Record<string, string> = {
  unknown: 'yellow',
  error: 'red',
  stopped: 'blue',
  running: 'green',
  custom: 'yellow',
  waitdebugger: 'yellow',
};

export type Plugin = {
  id: string;
  avatar: string;
  name: string;
  automaticStartup: boolean;
  state: 'stopped';
};

export function Plugins(props: PluginsProps) {
  const dispatch = useDispatch();
  const pluginsInstancesEntities = useSelector(selectAllPluginsInstances);
  const loadingStatus = useSelector(getPluginsInstancesLoadingStatus);
  const paging = useSelector(getPluginsInstancesPaging);

  //we need a table instance ref to pass as a prop to the MRT Toolbar buttons
  const tableInstanceRef = useRef<MRT_TableInstance<Plugin>>(null);

  //we will also need some weird re-render hacks to force the MRT_ components to re-render since ref changes do not trigger a re-render
  const rerender = useReducer(() => ({}), {})[1];

  //we need to manage the state that should trigger the MRT_ components in our custom toolbar to re-render
  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    {}
  );

  const { t } = useTranslation();

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
          accessorKey: 'type',
          header: 'Type',
          enableColumnOrdering: true, //but you can turn back any of those features on if you want like this
          Cell: ({ row }) => (
            <Image
              width={120}
              height={50}
              fit="contain"
              src={
                'http://localhost:8080/rest/v2/plugins?byType=' +
                row.original.type +
                '&prop=icon'
              }
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
          //columnDefType: 'display', //turns off data column features like sorting, filtering, etc.
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
    { title: 'home', href: '#' },
    { title: 'plugins', href: '#' },
  ];

  return (
    <Flex direction="column">
      <BreadCrumbs breadcrumbsItems={breadcrumbsItem} />

      <Title order={3} size="h3" m="md">
        {t('plugins.home.description')}
      </Title>

      {isCreatePluginModelOpened && (
        <CreateNewPlugin
          opened={isCreatePluginModelOpened}
          onClose={handleModalClose}
        />
      )}

      {tableInstanceRef.current && (
        <Flex
          sx={(theme) => ({
            backgroundColor: theme.fn.rgba(theme.colors.blue[3], 0.2),
            borderRadius: '4px',
            flexDirection: 'row',
            gap: '16px',
            justifyContent: 'space-between',
            padding: '24px 16px',
            '@media max-width: 768px': {
              flexDirection: 'column',
            },
          })}
        >
          <MRT_GlobalFilterTextInput table={tableInstanceRef.current} />
          <Box>
            <Button
              leftIcon={<IconHomePlus />}
              onClick={() => setCreatePluginModelOpened(true)}
            >
              {t('plugins.home.create-new-plugin-btn')}
            </Button>
          </Box>
        </Flex>
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
            'mrt-row-expand':{
              mantineTableHeadCellProps: {
                align: 'right',
              },
              mantineTableBodyCellProps: {
                align: 'right',
              },
            }
          }}
          columns={columns}
          data={tableData}
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          positionExpandColumn="first"
          positionActionsColumn="last"
          enableTopToolbar={false}
          initialState={{ showGlobalFilter: true }}
          tableInstanceRef={tableInstanceRef}
          icons={{
            IconSearch: () => <IconHomeSearch />,
          }}
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                display: 'grid',
                margin: 'auto',
                gridTemplateColumns: '1fr 1fr',
                width: '100%',
              }}
            >
              <text>Name: {row.original.displayName}</text>
              <text>State: {row.original.state}</text>
            </Box>
          )}
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
