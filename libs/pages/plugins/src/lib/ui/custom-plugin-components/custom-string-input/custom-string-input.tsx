import { PasswordInput, TextInput } from '@mantine/core';
import React from 'react';
import { StringField } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';

interface CustomTextInputProps {
  pluginKey: string;
  field: StringField;
  form: FormReturnType;
  path: string;
}

export function CustomStringInput(props: CustomTextInputProps) {
  if (!props.field.encrypted) {
    return (
      <TextInput
        {...props.form.getInputProps(props.path)}
        key={props.form.key(props.path)}
        label={props.field.name}
        placeholder={props.field.name}
        description={<LinkifyText text={props.field.description} />}
        inputWrapperOrder={['label', 'error', 'input', 'description']}
        withAsterisk={!!props.field.required}
        required={props.field.required}
      />
    );
  }
  return (
    <PasswordInput
      {...props.form.getInputProps(props.path)}
      key={props.form.key(props.path)}
      label={props.field.name}
      placeholder={props.field.name}
      description={<LinkifyText text={props.field.description} />}
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      withAsterisk={!!props.field.required}
      required={props.field.required}
    />
  );
}

export default CustomStringInput;
