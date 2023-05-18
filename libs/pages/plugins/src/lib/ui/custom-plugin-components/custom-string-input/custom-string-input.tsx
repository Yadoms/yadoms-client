import { UseFormReturnType } from '@mantine/form';
import { TextInput } from '@mantine/core';
import React from 'react';
import { PluginConfigurationSchemaField } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';

export interface CustomTextInputProps {
  pluginKey: string;
  pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomStringInput(props: CustomTextInputProps) {
  return (
    <TextInput
      label={props.pluginConfigurationSchemaField.name}
      placeholder={props.pluginConfigurationSchemaField.name}
      description={
        <LinkifyText text={props.pluginConfigurationSchemaField.description} />
      }
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      withAsterisk={!!props.pluginConfigurationSchemaField.required}
      required={props.pluginConfigurationSchemaField.required}
      {...props.form.getInputProps(props.pluginKey)}
    />
  );
}

export default CustomStringInput;
