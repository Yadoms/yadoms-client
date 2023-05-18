import { PluginConfigurationSchemaField } from '@yadoms/domain/plugins';
import { UseFormReturnType } from '@mantine/form';
import { Box, Group, MultiSelect, Text } from '@mantine/core';
import { forwardRef } from 'react';

export interface CustomMultiSelectSectionProps {
  pluginKey: string;
  pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, any>>;
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, ...others }: ItemProps, ref) => (
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
        label={props.pluginConfigurationSchemaField.name}
        description={props.pluginConfigurationSchemaField.description}
        placeholder={props.pluginConfigurationSchemaField.placeholder}
        itemComponent={SelectItem}
        data={getMultiSelectData(props.pluginConfigurationSchemaField)}
        searchable
        nothingFound={props.pluginConfigurationSchemaField.nothingFound}
        maxDropdownHeight={400}
        defaultValue={getMultiSelectDefaultValue(
          props.pluginConfigurationSchemaField
        )}
      />
    </Box>
  );
}

function getMultiSelectData(field: PluginConfigurationSchemaField) {
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

function getMultiSelectDefaultValue(field: PluginConfigurationSchemaField) {
  const data: string[] = [];
  if (field.content) {
    data.push(
      ...Object.values(field.content)
        .filter((value) => value.defaultValue === true)
        .map((value) => value.name)
    );
  }
  return data;
}

export default CustomMultiSelectSection;
