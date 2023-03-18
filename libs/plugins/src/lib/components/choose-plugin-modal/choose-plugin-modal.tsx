import {
  Badge,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAvailablePlugins,
  selectAllAvailablePlugins,
  selectAvailablePluginsLoading,
} from '../../redux/available-plugins.slice';

export interface ChoosePluginModalProps {
  opened: boolean;
  onClose: () => void;
  selectedPluginId: string | null;
  onPluginSelect: (selectedPluginType: string) => void;
}

export function ChoosePluginModal(props: ChoosePluginModalProps) {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const availablePluginsEntities = useSelector(selectAllAvailablePlugins);

  const loadingStatus = useSelector(selectAvailablePluginsLoading);

  useEffect(() => {
    dispatch(fetchAvailablePlugins());
  }, [dispatch]);

  function generatePluginsGrid() {
    const filteredPlugins = availablePluginsEntities.filter((plugin) =>
      plugin.package.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredPlugins.map((availablePluginsEntity) => (
      <Grid.Col span={3} key={`col-${availablePluginsEntity.type}`}>
        <Card
          sx={{ display: 'flex', flexDirection: 'column' }}
          shadow="sm"
          p="xl"
          component="a"
          target="_blank"
          withBorder
          h={'100%'}
        >
          <Card.Section>
            <Image
              sx={{ cursor: 'pointer' }}
              src={`http://localhost:8080/rest/v2/plugins?byType=${availablePluginsEntity.package.type}&prop=icon`}
              height={160}
              onClick={() => props.onPluginSelect(availablePluginsEntity.type)}
              fit="contain"
              alt={availablePluginsEntity.package.type}
            />
          </Card.Section>

          <Group position="apart" mt="md">
            <Text fw={700}>{availablePluginsEntity.package.type}</Text>
            <Badge color="pink" variant="light">
              v{availablePluginsEntity.package.version}
            </Badge>
          </Group>
          <Text mt="xs" color="dimmed" size="sm" sx={{ flex: '1 0 auto' }}>
            {availablePluginsEntity.locales.description}
          </Text>
          <Flex justify={'flex-end'} mt="xs">
            <Text fz="xs" c="dimmed">
              by {availablePluginsEntity.package.author}
            </Text>
          </Flex>
        </Card>
      </Grid.Col>
    ));
  }
  return (
    <Modal
      overlayProps={{
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      title="Choose your Plugin"
      onClose={props.onClose}
      opened={props.opened}
      size="95%"
      styles={{ header: { zIndex: 1 } }}
    >
      <LoadingOverlay visible={loadingStatus} overlayBlur={2} />
      <TextInput
        sx={{ position: 'sticky', top: '65px', zIndex: 1 }}
        placeholder="Search a plugin"
        p="lg"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <Container fluid>
        <Grid grow>{generatePluginsGrid()}</Grid>
      </Container>
    </Modal>
  );
}

export default ChoosePluginModal;
