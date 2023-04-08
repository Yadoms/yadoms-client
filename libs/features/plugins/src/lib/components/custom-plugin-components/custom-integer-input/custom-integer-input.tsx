import {
  PluginConfigurationSchema,
  PluginConfigurationSchemaField,
} from '../../../model/plugin-configuration-schema.model';
import { UseFormReturnType } from '@mantine/form';
import { NumberInput, TextInput } from '@mantine/core';
import React from 'react';

export interface CustomTextInputProps {
  pluginKey: string;
  pluginConfigurationSchema: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomIntegerInput(props: CustomTextInputProps) {
  return (
    <NumberInput
      label={props.pluginConfigurationSchema.name}
      description={props.pluginConfigurationSchema.description}
      placeholder={props.pluginConfigurationSchema.name}
      defaultValue={props.pluginConfigurationSchema.defaultValue}
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      withAsterisk={!!props.pluginConfigurationSchema.required}
      min={0}
    />
  );
}

export default CustomIntegerInput;
