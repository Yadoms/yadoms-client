import { MultiSelectSectionField } from '@yadoms/domain/plugins';
import { Box, Group, MultiSelect, Text } from '@mantine/core';
import React, { forwardRef } from 'react';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';

export interface CustomMultiSelectSectionProps {
  pluginKey: string;
  field: MultiSelectSectionField;
  form: FormReturnType;
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
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
      />
    </Box>
  );
}

function getMultiSelectData(field: MultiSelectSectionField) {
  const data: ItemProps[] = [];
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
