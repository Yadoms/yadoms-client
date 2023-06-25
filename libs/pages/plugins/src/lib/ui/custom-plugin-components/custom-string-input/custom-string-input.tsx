import { UseFormReturnType } from '@mantine/form';
import { TextInput } from '@mantine/core';
import React from 'react';
import { StringField } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';

interface CustomTextInputProps {
  pluginKey: string;
  field: StringField;
  form: FormReturnType;
}

export function CustomStringInput(props: CustomTextInputProps) {
  return (
    <TextInput
      label={props.field.name}
      placeholder={props.field.name}
      description={<LinkifyText text={props.field.description} />}
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      withAsterisk={!!props.field.required}
      required={props.field.required}
      {...props.form.getInputProps(props.pluginKey)}
    />
  );
}

export default CustomStringInput;
