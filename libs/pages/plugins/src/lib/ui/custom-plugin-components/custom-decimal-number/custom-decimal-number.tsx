import { UseFormReturnType } from '@mantine/form';
import { NumberInput } from '@mantine/core';
import React from 'react';
import { DecimalField } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';

export interface CustomDecimalNumberProps {
  pluginKey: string;
  field: DecimalField;
  form: UseFormReturnType<Record<string, unknown>>;
}

export function CustomDecimalNumber(props: CustomDecimalNumberProps) {
  return (
    <NumberInput
      label={props.field.name}
      defaultValue={
        isNumber(props.field.defaultValue)
          ? props.field.defaultValue
          : undefined
      }
      description={<LinkifyText text={props.field.description} />}
      precision={props.field.precision}
      step={props.field.step}
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
