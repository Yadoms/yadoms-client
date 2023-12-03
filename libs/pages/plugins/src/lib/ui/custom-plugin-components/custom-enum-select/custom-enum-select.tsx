import { Select } from '@mantine/core';
import React from 'react';
import { ItemProps } from '../../plugin-configuration-modal/plugin-configuration-modal';
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
      label={props.field.name}
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      data={getEnumValuesData(props.field)}
      defaultValue={props.field.defaultValue}
      description={<LinkifyText text={props.field.description} />}
      {...props.form.getInputProps(props.path)}
      withAsterisk
    />
  );
}

function getEnumValuesData(field: EnumField): ItemProps[] {
  const data: ItemProps[] = [];
  Object.entries(field.values).map(([key, value]) => {
    data.push({
      value: key,
      label: value as string,
    });
  });

  return data;
}

export default CustomEnumSelect;
