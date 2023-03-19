import { Modal, useMantineTheme } from '@mantine/core';
import PluginConfiguration, {
  PluginConfigurationSchema,
} from '../plugin-configuration/plugin-configuration';

export interface PluginConfigurationModalProps {
  opened: boolean;
  onClose: () => void;
  selectedPluginConfigurationSchema: PluginConfigurationSchema;
  selectedPluginType: string;
}

export function PluginConfigurationModal(props: PluginConfigurationModalProps) {
  const theme = useMantineTheme();

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
      zIndex={1000}
      size="95%"
    >
      <PluginConfiguration
        configurationSchema={props.selectedPluginConfigurationSchema}
        selectedPluginType={props.selectedPluginType}
      />
    </Modal>
  );
}

export default PluginConfigurationModal;
