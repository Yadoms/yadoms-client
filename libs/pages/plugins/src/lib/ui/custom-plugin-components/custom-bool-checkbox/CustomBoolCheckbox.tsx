import { UseFormReturnType } from '@mantine/form';
import { Checkbox } from '@mantine/core';
import React, { useState } from 'react';
import { BooleanField } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';

export interface CustomBoolCheckboxProps {
  pluginKey: string;
  field: BooleanField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomBoolCheckbox(props: CustomBoolCheckboxProps) {
  const [checked, setChecked] = useState(
    isBoolean(props.field.defaultValue) ? props.field.defaultValue : undefined
  );
  return (
    <Checkbox
      label={props.field.name}
      description={<LinkifyText text={props.field.description} />}
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      p={2}
    />
  );
}

function isBoolean(
  value: number | boolean | string | undefined
): value is boolean {
  return typeof value === 'boolean';
}

export default CustomBoolCheckbox;
