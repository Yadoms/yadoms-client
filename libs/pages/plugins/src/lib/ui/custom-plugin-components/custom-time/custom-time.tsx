import {
  CustomTimeField,
  PluginConfigurationSchemaField,
} from '@yadoms/domain/plugins';
import { UseFormReturnType } from '@mantine/form';
import { TimeInput } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';
import LinkifyText from '../../linkify-text/linkify-text';
import React from 'react';

export interface CustomTimeProps {
  pluginKey: string;
  field: CustomTimeField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomTime(props: CustomTimeProps) {
  return (
    <TimeInput
      icon={<IconClock size="1rem" stroke={1.5} />}
      label={props.field.name}
      description={<LinkifyText text={props.field.description} />}
      required={props.field.required}
      withAsterisk={props.field.required}
      defaultValue={props.field.defaultValue?.toString()}
    />
  );
}
