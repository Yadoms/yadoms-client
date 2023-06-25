import { UseFormReturnType } from '@mantine/form';
import { NumberInput } from '@mantine/core';
import React from 'react';
import { IntegerField } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';

export interface CustomTextInputProps {
  pluginKey: string;
  field: IntegerField;
  form: UseFormReturnType<Record<string, unknown>>;
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
