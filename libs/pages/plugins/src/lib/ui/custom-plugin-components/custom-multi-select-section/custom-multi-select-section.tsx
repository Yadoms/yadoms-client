import { MultiSelectSectionField } from '@yadoms/domain/plugins';
import { Box, Group, MultiSelect, Text } from '@mantine/core';
import React, { forwardRef } from 'react';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';
import classes from '../components.module.css';

export interface CustomMultiSelectSectionProps {
  pluginKey: string;
  field: MultiSelectSectionField;
  form: FormReturnType;
  path: string;
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group wrap="nowrap">
        <div>
          <Text>{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export function CustomMultiSelectSection(props: CustomMultiSelectSectionProps) {
  return (
    <Box className={classes.box}>
      <MultiSelect
        label={props.field.name}
        description={<LinkifyText text={props.field.description} />}
        placeholder={props.field.placeholder}
        itemComponent={SelectItem}
        data={getMultiSelectData(props.field)}
        searchable
        nothingFound={props.field.nothingFound}
        maxDropdownHeight={400}
        defaultValue={getMultiSelectDefaultValue(props.field)}
        {...props.form.getInputProps(props.path)}
      />
    </Box>
  );
}

function getMultiSelectData(field: MultiSelectSectionField) {
  const data: ItemProps[] = [];
  console.log('field', field);
  if (field.content) {
    Object.entries(field.content).map(([key, value]) => {
      data.push({
        value: value.name,
        label: value.name,
        description: value.description,
      });
    });
  }
  return data;
}

function getMultiSelectDefaultValue(field: MultiSelectSectionField) {
  const data: string[] = [];
  if (field.content) {
    data.push(
      ...Object.values(field.content)
        .filter((value) => value.defaultValue)
        .map((value) => value.name)
    );
  }
  return data;
}

export default CustomMultiSelectSection;
