import { UseFormReturnType } from '@mantine/form';
import { Box, Group, Select, Text } from '@mantine/core';
import React, { forwardRef, useState } from 'react';
import { ItemProps } from '../../plugin-configuration-modal/plugin-configuration-modal';
import renderPluginField from '../../render-plugin-field/render-plugin-field';
import { ComboSectionField, PluginForm } from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';

export interface CustomComboSectionProps {
  pluginKey: string;
  field: ComboSectionField;
  form: PluginForm;
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
  const [selectedComboSection, setSelectedComboSection] = useState(() => {
    const data = getComboSectionData(props.field);
    return data.length > 0 ? data[0].value : '';
  });
  // TODO : to be removed when seb added empty content to Linky plugin
  const selectedComboSectionContent =
    props.field.content[selectedComboSection]?.content;
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
      <Select
        value={selectedComboSection}
        onChange={(event: string) => setSelectedComboSection(event)}
        label={props.field.name}
        description={<LinkifyText text={props.field.description} />}
        inputWrapperOrder={['label', 'error', 'input', 'description']}
        defaultValue={getComboSectionData(props.field)[0].label}
        itemComponent={SelectItem}
        data={getComboSectionData(props.field)}
      />
      {selectedComboSectionContent && (
        <div>
          {Object.entries(selectedComboSectionContent).map(([key, value]) =>
            renderPluginField({
              field: value,
              form: props.form,
              pluginKey: key,
            })
          )}
        </div>
      )}
      {/*{Object.entries(*/}
      {/*  props.field.content[selectedComboSection] &&*/}
      {/*  props.field.content[selectedComboSection].content*/}
      {/*).map(([key, value]) =>*/}
      {/*  renderPluginField({*/}
      {/*    field: value,*/}
      {/*    form: props.form,*/}
      {/*    pluginKey: key*/}
      {/*  })*/}
      {/*)}*/}
    </Box>
  );
}

function getComboSectionData(field: ComboSectionField) {
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
