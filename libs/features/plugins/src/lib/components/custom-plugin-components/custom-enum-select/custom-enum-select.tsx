import { Select } from '@mantine/core';
import React from 'react';
import { PluginConfigurationSchemaField } from '../../../model/plugin-configuration-schema.model';
import { UseFormReturnType } from '@mantine/form';
import { ItemProps } from '../../plugin-configuration-modal/plugin-configuration-modal';

export interface CustomEnumSelectProps {
  pluginKey: string;
  pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomEnumSelect(props: CustomEnumSelectProps) {
  return (
    <Select
      label={props.pluginKey}
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      value={getEnumValuesData(props.pluginConfigurationSchemaField)[0].value}
      data={getEnumValuesData(props.pluginConfigurationSchemaField)}
      withAsterisk
    />
  );
}
function getEnumValuesData(field: PluginConfigurationSchemaField): ItemProps[] {
  const data: ItemProps[] = [];
  Object.entries(field.values).map(([key, value]) => {
    data.push({
      value: key,
      label: value,
    });
  });

  return data;
}
export default CustomEnumSelect;
