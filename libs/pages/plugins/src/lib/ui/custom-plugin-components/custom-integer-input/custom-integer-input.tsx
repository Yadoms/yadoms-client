import { NumberInput } from '@mantine/core';
import React from 'react';
import { IntegerField } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';

export interface CustomTextInputProps {
  pluginKey: string;
  field: IntegerField;
  form: FormReturnType;
  path: string;
}

export function CustomIntegerInput(props: CustomTextInputProps) {
  return (
    <NumberInput
      label={props.field.name}
      description={<LinkifyText text={props.field.description} />}
      placeholder={props.field.name}
      defaultValue={
        isNumber(props.field.defaultValue)
          ? props.field.defaultValue
          : undefined
      }
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      withAsterisk={!!props.field.required}
      {...props.form.getInputProps(props.path)}
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
