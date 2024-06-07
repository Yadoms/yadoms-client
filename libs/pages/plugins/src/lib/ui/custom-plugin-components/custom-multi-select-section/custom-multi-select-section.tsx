import { MultiSelectSectionField } from '@yadoms/domain/plugins';
import { Box, Group, MultiSelect, MultiSelectProps, Text } from '@mantine/core';
import React from 'react';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';
import classes from '../components.module.css';

export interface CustomMultiSelectSectionProps {
  pluginKey: string;
  field: MultiSelectSectionField;
  form: FormReturnType;
  path: string;
}

export function CustomMultiSelectSection(props: CustomMultiSelectSectionProps) {
  const renderMultiSelectOption: MultiSelectProps['renderOption'] = ({
    option,
  }) => (
    <Group wrap="nowrap">
      <div>
        <Text>{props.field.content[option.value].name}</Text>
        <Text size="xs" color="dimmed">
          {props.field.content[option.value].description}
        </Text>
      </div>
    </Group>
  );

  return (
    <Box className={classes.box}>
      <MultiSelect
        comboboxProps={{ zIndex: 1000 }}
        label={props.field.name}
        description={<LinkifyText text={props.field.description} />}
        placeholder={props.field.placeholder}
        renderOption={renderMultiSelectOption}
        data={getMultiSelectData(props.field)}
        inputWrapperOrder={['label', 'error', 'description', 'input']}
        searchable
        nothingFoundMessage={props.field.nothingFound}
        maxDropdownHeight={400}
        defaultValue={getMultiSelectDefaultValue(props.field)}
      />
    </Box>
  );
}

function getMultiSelectData(field: MultiSelectSectionField) {
  const data: string[] = [];
  if (field.content) {
    Object.entries(field.content).map(([key, value]) => {
      data.push(key);
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
