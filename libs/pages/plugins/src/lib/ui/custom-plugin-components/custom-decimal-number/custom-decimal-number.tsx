import { UseFormReturnType } from '@mantine/form';
import { NumberInput } from '@mantine/core';
import React from 'react';
import { PluginConfigurationSchemaField } from '@yadoms/domain/plugins';

export interface CustomDecimalNumberProps {
  pluginKey: string;
  pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomDecimalNumber(props: CustomDecimalNumberProps) {
  return (
    <NumberInput
      label={props.pluginConfigurationSchemaField.name}
      defaultValue={
        isNumber(props.pluginConfigurationSchemaField.defaultValue)
          ? props.pluginConfigurationSchemaField.defaultValue
          : undefined
      }
      description={props.pluginConfigurationSchemaField.description}
      precision={props.pluginConfigurationSchemaField.precision}
      step={props.pluginConfigurationSchemaField.step}
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      withAsterisk
    />
  );
}

function isNumber(
  value: number | boolean | string | undefined
): value is number {
  return typeof value === 'number';
}

export default CustomDecimalNumber;
