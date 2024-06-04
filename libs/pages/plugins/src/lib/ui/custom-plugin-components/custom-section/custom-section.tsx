import { UseFormReturnType } from '@mantine/form';
import { Box, Text } from '@mantine/core';
import React from 'react';
import renderPluginField from '../../render-plugin-field/render-plugin-field';
import { SectionField } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';
import classes from '../components.module.css';

export interface CustomSectionProps {
  pluginKey: string;
  field: SectionField;
  form: FormReturnType;
  path: string;
}

export function CustomSection(props: CustomSectionProps) {
  return (
    <Box className={classes.box}>
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
                path: '',
                pluginKey: key,
              })
            )}
        </div>
      </div>
    </Box>
  );
}

export default CustomSection;
