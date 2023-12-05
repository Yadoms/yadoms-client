import {
  CheckboxSectionField,
  getInitialValuesFromSectionFields,
} from '@yadoms/domain/plugins';
import { Box, Checkbox } from '@mantine/core';
import React, { useState } from 'react';
import renderPluginField from '../../render-plugin-field/render-plugin-field';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';

export interface CustomCheckboxSectionProps {
  pluginKey: string;
  field: CheckboxSectionField;
  form: FormReturnType;
  path: string;
}

export function CustomCheckboxSection(props: CustomCheckboxSectionProps) {
  const [checked, setChecked] = useState<boolean | undefined>(
    !!props.field.defaultValue
  );
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
      <Checkbox
        label={props.field.name}
        description={<LinkifyText text={props.field.description} />}
        checked={checked}
        {...props.form.getInputProps(props.path)}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />

      {checked && (
        <div>
          {getInitialValuesFromSectionFields(
            props.field.content,
            props.path,
            ''
          ).map(({ key, path, field }) =>
            renderPluginField({
              field: field,
              form: props.form,
              path: path,
              pluginKey: key,
            })
          )}
        </div>
      )}
    </Box>
  );
}
