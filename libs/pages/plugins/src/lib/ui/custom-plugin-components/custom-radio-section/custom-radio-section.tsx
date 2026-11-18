import {
  getNestedSectionFields,
  RadioSectionField,
} from '@yadoms/domain/plugins';
import { Box, Group, Radio } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';
import classes from '../components.module.css';
import renderPluginField from '../../render-plugin-field/render-plugin-field';
import { ItemProps } from '../../plugin-configuration-modal/plugin-configuration-modal';

export interface CustomRadioSectionProps {
  pluginKey: string;
  field: RadioSectionField;
  form: FormReturnType;
  path: string;
}

export function CustomRadioSection(props: CustomRadioSectionProps) {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const data = getRadioSectionData(props.field);
    const activeSection = props.field.activeSection;
    if (data.some((item) => item.value === activeSection)) {
      setSelectedOption(activeSection);
      return;
    }
    const defaultValue = data.length > 0 ? data[0].value : '';
    setSelectedOption(defaultValue);
  }, [props.field]);

  function getGroupOptions() {
    const radioSectionData = getRadioSectionData(props.field);
    return (
      <Group mt="xs">
        {radioSectionData.map((itemProps) => (
          <Radio
            key={itemProps.value}
            value={itemProps.value}
            label={itemProps.label}
          />
        ))}
      </Group>
    );
  }

  return (
    <Box className={classes.box}>
      <Radio.Group
        value={selectedOption}
        onChange={(event) => {
          props.form.setFieldValue(`${props.path}.activeSection`, event);
          setSelectedOption(event);
        }}
        name={props.field.name}
        label={props.field.name}
        description={<LinkifyText text={props.field.description} />}
        withAsterisk
      >
        {getGroupOptions()}
      </Radio.Group>
      {props.field.content[selectedOption] && (
        <div>
          {getNestedSectionFields(
            props.field.content[selectedOption].content,
            `${props.path}.content.${selectedOption}`,
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

function getRadioSectionData(field: RadioSectionField) {
  const data: ItemProps[] = [];
  if (field.content) {
    Object.entries(field.content).map(([key, value]) => {
      data.push({
        value: key,
        label: value.name,
      });
    });
  }
  return data;
}

export default CustomRadioSection;
