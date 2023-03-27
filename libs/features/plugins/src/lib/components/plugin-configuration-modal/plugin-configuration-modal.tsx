import { Button, Flex, Modal, useMantineTheme } from '@mantine/core';
import PluginConfiguration, {
  PluginConfigurationSchema,
} from '../plugin-configuration/plugin-configuration';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface PluginConfigurationModalProps {
  opened: boolean;
  onClose: () => void;
  selectedPluginConfigurationSchema: PluginConfigurationSchema;
  selectedPluginType: string;
}

export function PluginConfigurationModal(props: PluginConfigurationModalProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation();
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
      onClose={props.onClose}
      opened={props.opened}
      zIndex={1001}
      size="95%"
      title={t('plugins.modal.plugin-configuration.title')}
    >
      <PluginConfiguration
        configurationSchema={props.selectedPluginConfigurationSchema}
        selectedPluginType={props.selectedPluginType}
      />
      <Flex
        mih={50}
        gap="xs"
        justify="flex-end"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Button variant={'outline'} onClick={props.onClose}>
          {t('plugins.modal.plugin-configuration.back')}
        </Button>
        <Button>{t('plugins.modal.plugin-configuration.create')}</Button>
      </Flex>
    </Modal>
  );
}

export default PluginConfigurationModal;
