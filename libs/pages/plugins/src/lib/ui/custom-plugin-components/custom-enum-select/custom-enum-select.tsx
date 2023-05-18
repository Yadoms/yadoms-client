import { Select } from '@mantine/core';
import React, { useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { ItemProps } from '../../plugin-configuration-modal/plugin-configuration-modal';
import { PluginConfigurationSchemaField } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';

export interface CustomEnumSelectProps {
  pluginKey: string;
  pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomEnumSelect(props: CustomEnumSelectProps) {
  const [value, setValue] = useState<string | null>(
    getEnumValuesData(props.pluginConfigurationSchemaField)[0].value
  );
  return (
    <Select
      label={props.pluginConfigurationSchemaField.name}
      inputWrapperOrder={['label', 'error', 'input', 'description']}
      value={value}
      data={getEnumValuesData(props.pluginConfigurationSchemaField)}
      defaultValue={props.pluginConfigurationSchemaField.defaultValue}
      description={
        <LinkifyText text={props.pluginConfigurationSchemaField.description} />
      }
      onChange={setValue}
      withAsterisk
    />
  );
}

function getEnumValuesData(field: PluginConfigurationSchemaField): ItemProps[] {
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
