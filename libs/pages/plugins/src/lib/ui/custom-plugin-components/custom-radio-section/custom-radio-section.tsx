import { RadioSectionField } from '@yadoms/domain/plugins';
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
          console.log('event', event);
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
          {Object.entries(props.field.content[selectedOption].content).map(
            ([key, value]) =>
              renderPluginField({
                field: value,
                form: props.form,
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
