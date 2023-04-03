import {
  Badge,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  Text,
  TextInput,
  Divider,
  Button,
  ScrollArea,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAvailablePlugins,
  selectAllAvailablePlugins,
  selectAvailablePluginsLoading,
} from '../../redux/available-plugins.slice';
import { useTranslation } from 'react-i18next';

export interface ChoosePluginModalProps {
  opened: boolean;
  onClose: () => void;
  selectedPluginId: string | null;
  onPluginSelect: (selectedPluginType: string) => void;
}

export function ChoosePluginModal(props: ChoosePluginModalProps) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const { t } = useTranslation();

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
    <Modal.Root
      onClose={props.onClose}
      opened={props.opened}
      size="95%"
      zIndex={1000}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Modal.Overlay opacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            {
              <Flex align={'center'}>
                <Text>{t('plugins.modal.choose-plugin.title')}</Text>
                <Divider size="sm" orientation="vertical" mx={10} />
                <TextInput
                  data-autofocus
                  placeholder={t('plugins.modal.choose-plugin.search')}
                  icon={<IconSearch size="0.9rem" stroke={1.5} />}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </Flex>
            }
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <LoadingOverlay visible={loadingStatus} overlayBlur={2} />
          <Grid grow>{generatePluginsGrid()}</Grid>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

export default ChoosePluginModal;
