import { UseFormReturnType } from '@mantine/form';
import { NumberInput } from '@mantine/core';
import React from 'react';
import { PluginConfigurationSchemaField } from '@yadoms/domain/plugins';

export interface CustomTextInputProps {
  pluginKey: string;
  pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomIntegerInput(props: CustomTextInputProps) {
  return (
    <NumberInput
      label={props.pluginConfigurationSchemaField.name}
      description={props.pluginConfigurationSchemaField.description}
      placeholder={props.pluginConfigurationSchemaField.name}
      defaultValue={
        isNumber(props.pluginConfigurationSchemaField.defaultValue)
          ? props.pluginConfigurationSchemaField.defaultValue
          : undefined
      }
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      withAsterisk={!!props.pluginConfigurationSchemaField.required}
      min={0}
    />
  );
}

function isNumber(
  value: number | boolean | string | undefined
): value is number {
  return typeof value === 'number';
}

export default CustomIntegerInput;
