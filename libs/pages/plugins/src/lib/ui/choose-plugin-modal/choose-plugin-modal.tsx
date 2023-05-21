import {
  Badge,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Modal,
  ScrollArea,
  Text,
  TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import {
  fetchAvailablePlugins,
  selectAllAvailablePlugins,
  selectAvailablePluginsError,
  selectAvailablePluginsLoading,
} from '@yadoms/domain/plugins';
import { useTranslation } from 'react-i18next';
import LinkifyText from '../linkify-text/linkify-text';
import { ChoosePluginModalSkeleton } from './choose-plugin-modal-skeleton';
import { Resilience } from '../resilience/resilience';
import { useAppDispatch, useAppSelector } from '@yadoms/store';

export interface ChoosePluginModalProps {
  opened: boolean;
  onClose: () => void;
  selectedPluginId: string | null;
  onPluginSelect: (selectedPluginType: string) => void;
}

export function ChoosePluginModal(props: ChoosePluginModalProps) {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const { t } = useTranslation();

  const availablePluginsEntities = useAppSelector(selectAllAvailablePlugins);
  const loadingStatus = useAppSelector(selectAvailablePluginsLoading);
  const errorStatus = useAppSelector(selectAvailablePluginsError);

  useEffect(() => {
    dispatch(fetchAvailablePlugins());
  }, [dispatch]);

  function generatePluginsGrid() {
    const filteredPlugins = availablePluginsEntities.filter((plugin) =>
      plugin.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredPlugins.map((availablePluginsEntity) => (
      <Grid.Col span={3} key={`col-${availablePluginsEntity.type}`}>
        <Card
          sx={{ display: 'flex', flexDirection: 'column' }}
          shadow="sm"
          p="xl"
          withBorder
          h={'100%'}
        >
          <Card.Section>
            <Image
              sx={{ cursor: 'pointer' }}
              src={`http://localhost:8080/rest/v2/plugins?byType=${availablePluginsEntity.type}&prop=icon`}
              height={160}
              onClick={() => props.onPluginSelect(availablePluginsEntity.type)}
              fit="contain"
              alt={availablePluginsEntity.type}
            />
          </Card.Section>

          <Group position="apart" mt="md">
            <Text fw={700}>{availablePluginsEntity.type}</Text>
            <Badge color="pink" variant="light">
              v{availablePluginsEntity.version}
            </Badge>
          </Group>

          <Text mt="xs" color="dimmed" size="sm" sx={{ flex: '1 0 auto' }}>
            <LinkifyText
              text={availablePluginsEntity.description}
            ></LinkifyText>
          </Text>
          <Flex justify={'flex-end'} mt="xs">
            <Text fz="xs" c="dimmed">
              by {availablePluginsEntity.author}
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
                  disabled={loadingStatus || errorStatus}
                  data-autofocus
                  placeholder={t('plugins.modal.choose-plugin.search') || ''}
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
          <ChoosePluginModalSkeleton visible={loadingStatus} />
          <Resilience
            visible={errorStatus}
            textToDisplay={t('plugins.modal.choose-plugin.resilienceMsg')}
          />
          <Grid grow>{generatePluginsGrid()}</Grid>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

export default ChoosePluginModal;
