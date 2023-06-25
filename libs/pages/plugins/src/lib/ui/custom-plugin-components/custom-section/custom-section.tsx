import { UseFormReturnType } from '@mantine/form';
import { Box, Text } from '@mantine/core';
import React from 'react';
import renderPluginField from '../../render-plugin-field/render-plugin-field';
import { SectionField } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';

export interface CustomSectionProps {
  pluginKey: string;
  field: SectionField;
  form: FormReturnType;
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
        marginBottom: theme.spacing.xs,
        marginTop: theme.spacing.xs,
        borderRadius: theme.radius.md,
        border: `2px dotted ${theme.colors.blue[6]}`,
      })}
    >
      <div key={props.pluginKey}>
        <label>{props.field.name}</label>
        <Text fz="xs" color="dark.2">
          <LinkifyText text={props.field.description} />
        </Text>
        <div style={{ marginLeft: '10px' }}>
          {props.field.content &&
            Object.entries(props.field.content).map(([key, value]) =>
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
