import { Button, Flex, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getFromInitialValuesTest,
  PluginConfigurationSchema,
  withDefaultValues,
} from '@yadoms/domain/plugins';
import renderPluginField from '../render-plugin-field/render-plugin-field';
import { validateForm } from '../plugin-configuration-modal/plugins-configuration-forms';

export interface ConfigurationFormProps {
  /** Configuration schema merged with the current values */
  configuration: PluginConfigurationSchema;
  /** Must reject to keep the form open */
  onSave: (configuration: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

export function ConfigurationForm({
  configuration,
  onSave,
  onCancel,
}: ConfigurationFormProps) {
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const initialConfiguration = useMemo(
    () => withDefaultValues(configuration),
    [configuration]
  );
  const form = useForm({
    // Field components expect the plugin instance form shape
    initialValues: {
      type: '',
      displayName: '',
      configuration: initialConfiguration as Record<string, unknown>,
    },
    validate: (values) => validateForm(values),
  });

  const save = form.onSubmit(async (values) => {
    setSaving(true);
    try {
      await onSave(values.configuration);
    } catch {
      // Error is reported by onSave
    } finally {
      setSaving(false);
    }
  });

  return (
    <form onSubmit={save}>
      <Flex direction="column" gap={10}>
        {getFromInitialValuesTest(initialConfiguration).map(
          ({ key, path, field }) =>
            renderPluginField({ field, path, pluginKey: key, form })
        )}
      </Flex>
      <Group justify="flex-end" mt="md">
        <Button variant="outline" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button type="submit" loading={saving} disabled={!form.isDirty()}>
          {t('common.save')}
        </Button>
      </Group>
    </form>
  );
}

export default ConfigurationForm;
