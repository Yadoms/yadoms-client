import { Select } from '@mantine/core';
import React from 'react';
import { EnumField } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';

export interface CustomEnumSelectProps {
  pluginKey: string;
  field: EnumField;
  form: FormReturnType;
  path: string;
}

export function CustomEnumSelect(props: CustomEnumSelectProps) {
  const inputProps = props.form.getInputProps(props.path);
  return (
    <Select
      {...inputProps}
      key={props.form.key(props.path)}
      value={toSelectValue(inputProps.value)}
      comboboxProps={{ zIndex: 1000 }}
      label={props.field.name}
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      data={getEnumValuesData(props.field)}
      description={<LinkifyText text={props.field.description} />}
      withAsterisk
      allowDeselect={false}
    />
  );
}

function getEnumValuesData(
  field: EnumField
): { value: string; label: string }[] {
  return Object.entries(field.values ?? {}).map(([key, value]) => ({
    value: key,
    label: String(value ?? key),
  }));
}

function toSelectValue(value: unknown): string | null {
  return value === undefined || value === null ? null : String(value);
}

export default CustomEnumSelect;
