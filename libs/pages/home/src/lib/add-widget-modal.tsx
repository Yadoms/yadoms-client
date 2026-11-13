import { useState } from 'react';
import { Button, Group, Modal, Select, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { widgetTypes } from './widgets/widget-types';

export interface AddWidgetModalProps {
  opened: boolean;
  onClose: () => void;
  onCreate: (type: string) => Promise<void>;
}

export function AddWidgetModal({
  opened,
  onClose,
  onCreate,
}: AddWidgetModalProps) {
  const { t } = useTranslation();
  const [type, setType] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(false);

  const typesOptions = Object.keys(widgetTypes).map((widgetType) => ({
    value: widgetType,
    label: t(`widgets.types.${widgetType}`),
  }));

  const close = () => {
    setType(null);
    setError(false);
    onClose();
  };

  const create = async () => {
    if (!type) return;
    setCreating(true);
    setError(false);
    try {
      await onCreate(type);
      close();
    } catch (err) {
      console.error('Failed to create widget', err);
      setError(true);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Modal opened={opened} onClose={close} title={t('home.addWidget')}>
      <Select
        label={t('home.widgetType')}
        data={typesOptions}
        value={type}
        onChange={setType}
      />
      {error && (
        <Text c="red" size="sm" mt="sm">
          {t('home.addWidgetError')}
        </Text>
      )}
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={close}>
          {t('home.cancel')}
        </Button>
        <Button onClick={create} disabled={!type} loading={creating}>
          {t('home.create')}
        </Button>
      </Group>
    </Modal>
  );
}

export default AddWidgetModal;
