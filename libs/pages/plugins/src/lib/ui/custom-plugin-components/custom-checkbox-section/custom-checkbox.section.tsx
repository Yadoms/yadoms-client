import {
  CheckboxSectionField,
  getInitialValuesFromSectionFields,
} from '@yadoms/domain/plugins';
import { Box, Checkbox } from '@mantine/core';
import React, { useEffect, useState } from "react";
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
  const CHECKBOX_PATH = `${props.path}.checkbox`;
  const CHECKBOX_VALUE = props.form.getInputProps(CHECKBOX_PATH).value;

  const [checked, setChecked] = useState<boolean>(
    !!props.field.defaultValue
  );

  useEffect(() => {
    setChecked(CHECKBOX_VALUE);
  }, [CHECKBOX_VALUE]);

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
        {...props.form.getInputProps(CHECKBOX_PATH, { type: 'checkbox' })}
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
