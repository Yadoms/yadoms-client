import { PluginConfigurationSchemaField } from '@yadoms/domain/plugins';
import { UseFormReturnType } from '@mantine/form';
import { TimeInput } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';
import LinkifyText from '../../linkify-text/linkify-text';
import React from 'react';

export interface CustomTimeProps {
  pluginKey: string;
  pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomTime(props: CustomTimeProps) {
  return (
    <TimeInput
      icon={<IconClock size="1rem" stroke={1.5} />}
      label={props.pluginConfigurationSchemaField.name}
      description={
        <LinkifyText text={props.pluginConfigurationSchemaField.description} />
      }
      required={props.pluginConfigurationSchemaField.required}
      withAsterisk={props.pluginConfigurationSchemaField.required}
      defaultValue={props.pluginConfigurationSchemaField.defaultValue}
    />
  );
}
