import {
  Box,
  Combobox,
  Group,
  Input,
  InputBase,
  Text,
  useCombobox,
} from '@mantine/core';
import React, { useState } from 'react';
import renderPluginField from '../../render-plugin-field/render-plugin-field';
import {
  ComboSectionField,
  getInitialValuesFromSectionFields,
} from '@yadoms/domain/plugins';
import LinkifyText from '../../linkify-text/linkify-text';
import { FormReturnType } from '../../FormReturnType';
import classes from '../components.module.css';

export interface CustomComboSectionProps {
  pluginKey: string;
  field: ComboSectionField;
  form: FormReturnType;
  path: string;
}

interface Item {
  label: string;
  description: string;
  value: string;
}

function SelectOption({ label, description }: Item) {
  return (
    <Group wrap="nowrap">
      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs" opacity={0.65}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

export function CustomComboSection(props: CustomComboSectionProps) {
  const comboSectionData = getComboSectionData(props.field);
  const [selectedComboSection, setSelectedComboSection] = useState(() => {
    const data = comboSectionData;
    return data.length > 0 ? data[0].value : '';
  });
  // TODO : to be removed when seb added empty content to Linky plugin
  const selectedComboSectionContent =
    props.field.content[selectedComboSection].content;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string>(() => {
    const data = comboSectionData;
    return data.length > 0 ? data[0].value : '';
  });
  const selectedOption = comboSectionData.find((item) => {
    return item.value === value;
  });
  const options = comboSectionData.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      <SelectOption {...item} />
    </Combobox.Option>
  ));

  return (
    <Box className={classes.box}>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setSelectedComboSection(val);
          setValue(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
            multiline
            label={props.field.name}
            description={<LinkifyText text={props.field.description} />}
            inputWrapperOrder={['label', 'error', 'input', 'description']}
          >
            {selectedOption ? (
              <SelectOption {...selectedOption} />
            ) : (
              <Input.Placeholder>Pick value</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      {selectedComboSectionContent && (
        <div>
          {getInitialValuesFromSectionFields(
            selectedComboSectionContent,
            props.path,
            selectedComboSection
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

function getComboSectionData(field: ComboSectionField) {
  const data: Item[] = [];
  if (field.content) {
    Object.entries(field.content).map(([key, value]) => {
      data.push({
        value: key,
        description: value.description!,
        label: value.name!,
      });
    });
  }
  return data;
}

export default CustomComboSection;
