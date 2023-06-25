import {
  PluginConfigurationSchemaField,
  PluginConfigurationSchemaType,
  PluginForm,
} from '@yadoms/domain/plugins';
import React from 'react';
import { UseFormReturnType } from '@mantine/form';
import {
  CustomBoolCheckbox,
  CustomCheckboxSection,
  CustomComboSection,
  CustomDecimalNumber,
  CustomEnumSelect,
  CustomIntegerInput,
  CustomMultiSelectSection,
  CustomRadioSection,
  CustomSection,
  CustomStringInput,
  CustomTime,
} from '../custom-plugin-components';

type RenderFieldProps = {
  field: PluginConfigurationSchemaField;
  form: UseFormReturnType<Record<string, unknown>>;
  pluginKey: string;
};

type FieldComponentMap = {
  [key in PluginConfigurationSchemaType]: React.ComponentType<any>;
};

const fieldComponentMap: FieldComponentMap = {
  [PluginConfigurationSchemaType.String]: CustomStringInput,
  [PluginConfigurationSchemaType.Integer]: CustomIntegerInput,
  [PluginConfigurationSchemaType.Enum]: CustomEnumSelect,
  [PluginConfigurationSchemaType.Boolean]: CustomBoolCheckbox,
  [PluginConfigurationSchemaType.Decimal]: CustomDecimalNumber,
  [PluginConfigurationSchemaType.ComboSection]: CustomComboSection,
  [PluginConfigurationSchemaType.RadioSection]: CustomRadioSection,
  [PluginConfigurationSchemaType.Section]: CustomSection,
  [PluginConfigurationSchemaType.CheckboxSection]: CustomCheckboxSection,
  [PluginConfigurationSchemaType.CustomTime]: CustomTime,
  [PluginConfigurationSchemaType.MultiSelectSection]: CustomMultiSelectSection,
};

export default function renderPluginField({
  pluginKey,
  field,
  form,
}: RenderFieldProps) {
  const Component = fieldComponentMap[field.type];
  if (Component) {
    return (
      <Component
        field={field}
        form={form}
        pluginKey={pluginKey}
        key={pluginKey}
      />
    );
  }

  return null;
}
