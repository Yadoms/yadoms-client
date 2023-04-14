import { UseFormReturnType } from '@mantine/form';
import { TextInput } from '@mantine/core';
import React from 'react';
import { PluginConfigurationSchemaField } from '@yadoms/domain/plugins';

export interface CustomTextInputProps {
  pluginKey: string;
  pluginConfigurationSchema: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomStringInput(props: CustomTextInputProps) {
  return (
    <TextInput
      label={props.pluginConfigurationSchema.name}
      placeholder={props.pluginConfigurationSchema.name}
      description={props.pluginConfigurationSchema.description}
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      withAsterisk={!!props.pluginConfigurationSchema.required}
      {...props.form.getInputProps(props.pluginKey)}
      required={props.pluginConfigurationSchema.required}
    />
  );
}

export default CustomStringInput;
