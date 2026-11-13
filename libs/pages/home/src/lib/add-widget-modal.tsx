import { useState } from 'react';
import { Button, Group, Modal, Select } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { widgetTypes } from './widgets/widget-types';

export interface AddWidgetModalProps {
  opened: boolean;
  onClose: () => void;
  onTypeSelected: (type: string) => void;
}

export function AddWidgetModal({
  opened,
  onClose,
  onTypeSelected,
}: AddWidgetModalProps) {
  const { t } = useTranslation();
  const [type, setType] = useState<string | null>(null);

  const typesOptions = Object.keys(widgetTypes).map((widgetType) => ({
    value: widgetType,
    label: t(`widgets.types.${widgetType}`),
  }));

  const close = () => {
    setType(null);
    onClose();
  };

  const next = () => {
    if (!type) return;
    onTypeSelected(type);
    close();
  };

  return (
    <Modal opened={opened} onClose={close} title={t('home.addWidget')}>
      <Select
        label={t('home.widgetType')}
        data={typesOptions}
        value={type}
        onChange={setType}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={close}>
          {t('home.cancel')}
        </Button>
        <Button onClick={next} disabled={!type}>
          {t('home.next')}
        </Button>
      </Group>
    </Modal>
  );
}

export default AddWidgetModal;
