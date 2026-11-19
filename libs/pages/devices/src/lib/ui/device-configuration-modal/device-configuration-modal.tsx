import { Modal } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { DeviceEntity, devicesApi } from '@yadoms/domain/keywords';
import { PluginConfigurationSchema } from '@yadoms/domain/plugins';
import { ConfigurationForm } from '@yadoms/pages/plugins';

export interface DeviceConfigurationModalProps {
  device: DeviceEntity;
  /** Configuration schema merged with the current values */
  configuration: PluginConfigurationSchema;
  onClose: () => void;
  onConfigurationChanged: () => Promise<void>;
}

export function DeviceConfigurationModal({
  device,
  configuration,
  onClose,
  onConfigurationChanged,
}: DeviceConfigurationModalProps) {
  const { t } = useTranslation();

  const save = async (values: Record<string, unknown>) => {
    try {
      await devicesApi.updateConfiguration(device.id, values);
    } catch (err) {
      console.error('Device configuration save failed', err);
      notifications.show({
        color: 'red',
        message: t('devices.configuration.saveError'),
      });
      throw err;
    }
    notifications.show({
      color: 'green',
      message: t('devices.configuration.saved'),
    });
    await onConfigurationChanged();
    onClose();
  };

  return (
    <Modal
      opened
      onClose={onClose}
      size="xl"
      title={t('devices.configuration.title', { name: device.friendlyName })}
    >
      <ConfigurationForm
        configuration={configuration}
        onSave={save}
        onCancel={onClose}
      />
    </Modal>
  );
}

export default DeviceConfigurationModal;
