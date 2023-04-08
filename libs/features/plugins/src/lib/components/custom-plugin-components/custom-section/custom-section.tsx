import { PluginConfigurationSchemaField } from '../../../model/plugin-configuration-schema.model';
import { UseFormReturnType } from '@mantine/form';
import { Box, Text } from '@mantine/core';
import React from 'react';
import renderPluginField from '../../render-plugin-field/render-plugin-field';

export interface CustomSectionProps {
  pluginKey: string;
  pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomSection(props: CustomSectionProps) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
        textAlign: 'left',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,
        border: 'solid',
      })}
    >
      <div key={props.pluginKey}>
        <label>{props.pluginConfigurationSchemaField.name}</label>
        <Text fz="xs" color="dark.2">
          {props.pluginConfigurationSchemaField.description}
        </Text>
        <div style={{ marginLeft: '10px' }}>
          {props.pluginConfigurationSchemaField.content &&
            Object.entries(props.pluginConfigurationSchemaField.content).map(
              ([key, value]) =>
                renderPluginField({
                  field: value,
                  form: props.form,
                  pluginKey: key,
                })
            )}
        </div>
      </div>
    </Box>
  );
}

export default CustomSection;
