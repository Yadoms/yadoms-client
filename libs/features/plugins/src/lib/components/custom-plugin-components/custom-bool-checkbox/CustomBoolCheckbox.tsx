import { PluginConfigurationSchemaField } from '../../../model/plugin-configuration-schema.model';
import { UseFormReturnType } from '@mantine/form';
import { Checkbox } from '@mantine/core';
import React, { useState } from 'react';

export interface CustomBoolCheckboxProps {
  pluginKey: string;
  pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomBoolCheckbox(props: CustomBoolCheckboxProps) {
  const [checked, setChecked] = useState(
    isBoolean(props.pluginConfigurationSchemaField.defaultValue)
      ? props.pluginConfigurationSchemaField.defaultValue
      : undefined
  );
  return (
    <Checkbox
      label={props.pluginConfigurationSchemaField.name}
      description={props.pluginConfigurationSchemaField.description}
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      p={2}
    />
  );
}

function isBoolean(
  value: number | boolean | string | undefined
): value is boolean {
  return typeof value === 'boolean';
}

export default CustomBoolCheckbox;
