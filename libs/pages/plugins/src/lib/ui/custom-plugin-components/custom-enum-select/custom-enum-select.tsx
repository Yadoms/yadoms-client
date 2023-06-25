import { Select } from '@mantine/core';
import React, { useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { ItemProps } from '../../plugin-configuration-modal/plugin-configuration-modal';
import { EnumField } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';

export interface CustomEnumSelectProps {
  pluginKey: string;
  field: EnumField;
  form: UseFormReturnType<Record<string, unknown>>;
}

export function CustomEnumSelect(props: CustomEnumSelectProps) {
  const [value, setValue] = useState<string | null>(
    getEnumValuesData(props.field)[0].value
  );
  return (
    <Select
      label={props.field.name}
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      value={value}
      data={getEnumValuesData(props.field)}
      defaultValue={props.field.defaultValue?.toString()}
      description={<LinkifyText text={props.field.description} />}
      onChange={setValue}
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
