import { ActionIcon, Group } from '@mantine/core';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import { KeyboardEvent, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface InlineEditProps {
  display: ReactNode;
  initialValue: string;
  renderInput: (value: string, onChange: (value: string) => void) => ReactNode;
  /** Must reject to keep the editor open */
  onSave: (value: string) => Promise<void>;
  editLabel: string;
  saveUnchanged?: boolean;
}

export function InlineEdit({
  display,
  initialValue,
  renderInput,
  onSave,
  editLabel,
  saveUnchanged = false,
}: InlineEditProps) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);

  const startEditing = () => {
    setValue(initialValue);
    setEditing(true);
  };

  const submit = async () => {
    if (!saveUnchanged && value === initialValue) {
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      await onSave(value);
      setEditing(false);
    } catch {
      // Error is reported by onSave, keep editing
    } finally {
      setSaving(false);
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      void submit();
    } else if (event.key === 'Escape') {
      // Don't let the surrounding modal close
      event.stopPropagation();
      setEditing(false);
    }
  };

  if (!editing) {
    return (
      <Group gap="xs" wrap="nowrap">
        {display}
        <ActionIcon
          variant="subtle"
          size="sm"
          aria-label={editLabel}
          title={editLabel}
          onClick={startEditing}
        >
          <IconPencil size={16} stroke={1.5} />
        </ActionIcon>
      </Group>
    );
  }

  return (
    <Group gap="xs" wrap="nowrap" onKeyDown={onKeyDown}>
      {renderInput(value, setValue)}
      <ActionIcon
        variant="subtle"
        color="green"
        size="sm"
        aria-label={t('devices.modal.save')}
        loading={saving}
        onClick={() => void submit()}
      >
        <IconCheck size={16} stroke={1.5} />
      </ActionIcon>
      <ActionIcon
        variant="subtle"
        color="gray"
        size="sm"
        aria-label={t('devices.modal.cancel')}
        disabled={saving}
        onClick={() => setEditing(false)}
      >
        <IconX size={16} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}

export default InlineEdit;
