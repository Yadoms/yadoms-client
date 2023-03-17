import { Modal, useMantineTheme } from '@mantine/core';
import PluginConfiguration from '../plugin-configuration/plugin-configuration';

export interface PluginConfigurationModalProps {
  opened: boolean;
  onClose: () => void;
}

export const configurationSchema = {
  Name: {
    type: 'string',
    required: true,
    description: 'Plugin custom name',
  },
  Port: {
    type: 'int',
    required: true,
    defaultValue: 80,
  },
  authentication: {
    type: 'section',
    enableWithCheckBox: true,
    checkbox: {
      defaultValue: true,
    },
    content: {
      Password: {
        type: 'string',
        encrypted: true,
        required: true,
      },
    },
  },
};
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
      size="95%"
    >
      <PluginConfiguration configurationSchema={configurationSchema} />
    </Modal>
  );
}

export default PluginConfigurationModal;
