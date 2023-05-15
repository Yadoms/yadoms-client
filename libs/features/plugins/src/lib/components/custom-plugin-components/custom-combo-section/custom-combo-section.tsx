import { PluginConfigurationSchemaField } from '../../../model/plugin-configuration-schema.model';
import { UseFormReturnType } from '@mantine/form';
import { Box, Group, Select, Text } from '@mantine/core';
import React, { forwardRef, useEffect, useState } from 'react';
import { ItemProps } from '../../plugin-configuration-modal/plugin-configuration-modal';
import renderPluginField from '../../render-plugin-field/render-plugin-field';

export interface CustomComboSectionProps {
  pluginKey: string;
  pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export function CustomComboSection(props: CustomComboSectionProps) {
  const [selectedComboSection, setSelectedComboSection] = useState('');

  useEffect(() => {
    const data = getComboSectionData(props.pluginConfigurationSchemaField);
    const defaultValue = data.length > 0 ? data[0].value : undefined;
    setSelectedComboSection(defaultValue);
  }, [props.pluginConfigurationSchemaField]);

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
        textAlign: 'left',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        border: 'solid',
      })}
    >
      <Select
        value={selectedComboSection}
        onChange={(event) => setSelectedComboSection(event)}
        label={props.pluginConfigurationSchemaField.name}
        description={props.pluginConfigurationSchemaField.description}
        inputWrapperOrder={['label', 'error', 'input', 'description']}
        defaultValue={
          getComboSectionData(props.pluginConfigurationSchemaField)[0].label
        }
        itemComponent={SelectItem}
        data={getComboSectionData(props.pluginConfigurationSchemaField)}
      />
      {props.pluginConfigurationSchemaField.content[selectedComboSection] &&
        props.pluginConfigurationSchemaField.content[selectedComboSection]
          .content && (
          <div>
            {Object.entries(
              props.pluginConfigurationSchemaField.content[selectedComboSection]
                .content
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

function getComboSectionData(field: PluginConfigurationSchemaField) {
  const data: ItemProps[] = [];
  if (field.content) {
    Object.entries(field.content).map(([key, value]) => {
      data.push({
        value: key,
        description: value.description,
        label: value.name,
      });
    });
  }
  return data;
}

export default CustomComboSection;
