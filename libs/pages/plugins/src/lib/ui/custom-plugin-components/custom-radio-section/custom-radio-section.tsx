import { UseFormReturnType } from '@mantine/form';
import { Box, Group, Radio } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { ItemProps } from '../../plugin-configuration-modal/plugin-configuration-modal';
import renderPluginField from '../../render-plugin-field/render-plugin-field';
import {
  PluginConfigurationSchema,
  PluginConfigurationSchemaField,
} from '@yadoms/domain/plugins';

export interface CustomRadioSectionProps {
  pluginKey: string;
  pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

export function CustomRadioSection(props: CustomRadioSectionProps) {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const data = getRadioSectionData(props.pluginConfigurationSchemaField);
    const defaultValue = data.length > 0 ? data[0].value : undefined;
    setSelectedOption(defaultValue);
  }, [props.pluginConfigurationSchemaField]);

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
        name={props.pluginConfigurationSchemaField.name}
        label={props.pluginConfigurationSchemaField.name}
        description={props.pluginConfigurationSchemaField.description}
        withAsterisk
      >
        <Group mt="xs">
          {renderRadioSection(props.pluginConfigurationSchemaField)}
        </Group>
      </Radio.Group>
      {props.pluginConfigurationSchemaField.content[selectedOption] && (
        <div>
          {Object.entries(
            props.pluginConfigurationSchemaField.content[selectedOption].content
          ).map(([key, value]) =>
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

function getRadioSectionData(field: PluginConfigurationSchema): ItemProps[] {
  const data: ItemProps[] = [];
  Object.entries(field.content).map(([key, value]) => {
    data.push({
      value: key,
      label: value.name,
    });
  });

  return data;
}

function renderRadioSection(field: PluginConfigurationSchemaField) {
  return getRadioSectionData(field).map((radioSectionData) => (
    <Radio
      value={radioSectionData.value}
      label={radioSectionData.label}
      key={radioSectionData.value}
    />
  ));
}
export default CustomRadioSection;
