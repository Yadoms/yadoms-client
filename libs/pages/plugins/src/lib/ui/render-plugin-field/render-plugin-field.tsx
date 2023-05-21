import {
  PluginConfigurationSchemaField,
  PluginConfigurationSchemaType,
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
  form: UseFormReturnType<Record<string, any>>;
  pluginKey: string;
};

export default function renderPluginField({
  pluginKey,
  field,
  form,
}: RenderFieldProps) {
  const componentProps = {
    form,
    pluginConfigurationSchemaField: field,
    pluginKey,
    key: pluginKey,
  };

  switch (field.type) {
    case PluginConfigurationSchemaType.String:
      return <CustomStringInput {...componentProps} />;
    case PluginConfigurationSchemaType.Integer:
      return <CustomIntegerInput {...componentProps} />;
    case PluginConfigurationSchemaType.Enum:
      return <CustomEnumSelect {...componentProps} />;
    case PluginConfigurationSchemaType.Boolean:
      return <CustomBoolCheckbox {...componentProps} />;
    case PluginConfigurationSchemaType.Decimal:
      return <CustomDecimalNumber {...componentProps} />;
    case PluginConfigurationSchemaType.ComboSection:
      return <CustomComboSection {...componentProps} />;
    case PluginConfigurationSchemaType.RadioSection:
      return <CustomRadioSection {...componentProps} />;
    case PluginConfigurationSchemaType.Section:
      return <CustomSection {...componentProps} />;
    case PluginConfigurationSchemaType.CheckboxSection:
      return <CustomCheckboxSection {...componentProps} />;
    case PluginConfigurationSchemaType.CustomTime:
      return <CustomTime {...componentProps} />;
    case PluginConfigurationSchemaType.MultiSelectSection:
      return <CustomMultiSelectSection {...componentProps} />;
    default:
      return null;
  }
}
