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
  return (
    <Select
      comboboxProps={{ zIndex: 1000 }}
      label={props.field.name}
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      data={getEnumValuesData(props.field)}
      defaultValue={getDefaultValue(props.field)}
      description={<LinkifyText text={props.field.description} />}
      withAsterisk
    />
  );
}

function getEnumValuesData(
  field: EnumField
): { value: string; label: string }[] {
  return Object.entries(field.values).map(([key, value]) => ({
    value: key,
    label: value.toString(),
  }));
}

function getDefaultValue(field: EnumField): string {
  const defaultValue = field.defaultValue?.toString();
  if (defaultValue === undefined) {
    return field.value.toString();
  }
  return defaultValue;
}

export default CustomEnumSelect;
