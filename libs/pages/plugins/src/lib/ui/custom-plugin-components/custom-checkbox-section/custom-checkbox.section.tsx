import {
  CheckboxSectionField,
  getInitialValuesFromSectionFields,
} from '@yadoms/domain/plugins';
import { Box, Checkbox } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import renderPluginField from '../../render-plugin-field/render-plugin-field';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';
import classes from '../components.module.css';

export interface CustomCheckboxSectionProps {
  pluginKey: string;
  field: CheckboxSectionField;
  form: FormReturnType;
  path: string;
}

export function CustomCheckboxSection(props: CustomCheckboxSectionProps) {
  const CHECKBOX_PATH = `${props.path}.checkbox`;
  const CHECKBOX_VALUE = props.form.getInputProps(CHECKBOX_PATH).value;

  const [checked, setChecked] = useState<boolean>(!!props.field.defaultValue);

  return (
    <Box className={classes.box}>
      <Checkbox
        label={props.field.name}
        description={<LinkifyText text={props.field.description} />}
        checked={checked}
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
