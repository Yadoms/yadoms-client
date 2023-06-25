import { UseFormReturnType } from '@mantine/form';
import { Box, Group, Radio } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { ItemProps } from '../../plugin-configuration-modal/plugin-configuration-modal';
import renderPluginField from '../../render-plugin-field/render-plugin-field';
import LinkifyText from '../../linkify-text/linkify-text';
import { PluginForm, RadioSectionField } from '@yadoms/domain/plugins';

export interface CustomRadioSectionProps {
  pluginKey: string;
  field: RadioSectionField;
  form: PluginForm;
}

export function CustomRadioSection(props: CustomRadioSectionProps) {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const data = getRadioSectionData(props.field);
    const defaultValue = data.length > 0 ? data[0].value : '';
    setSelectedOption(defaultValue);
  }, [props.field]);

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
      <Radio.Group
        value={selectedOption}
        onChange={(event) => setSelectedOption(event)}
        name={props.field.name}
        label={props.field.name}
        description={<LinkifyText text={props.field.description} />}
        withAsterisk
      >
        <Group mt="xs">{renderRadioSection(props.field)}</Group>
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

function getRadioSectionData(field: RadioSectionField): ItemProps[] {
  const data: ItemProps[] = [];
  Object.entries(field.content).map(([key, value]) => {
    data.push({
      value: key,
      label: value.name,
    });
  });

  return data;
}

function renderRadioSection(field: RadioSectionField) {
  return getRadioSectionData(field).map((radioSectionData) => (
    <Radio
      value={radioSectionData.value}
      label={radioSectionData.label}
      key={radioSectionData.value}
    />
  ));
}

export default CustomRadioSection;
