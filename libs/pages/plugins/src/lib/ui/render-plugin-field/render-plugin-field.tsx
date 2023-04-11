import {
  PluginConfigurationSchemaField,
  PluginConfigurationSchemaType,
} from '@yadoms/domain/plugins';
import CustomStringInput from '../custom-plugin-components/custom-string-input/custom-string-input';
import CustomIntegerInput from '../custom-plugin-components/custom-integer-input/custom-integer-input';
import CustomEnumSelect from '../custom-plugin-components/custom-enum-select/custom-enum-select';
import CustomBoolCheckbox from '../custom-plugin-components/custom-bool-checkbox/CustomBoolCheckbox';
import CustomDecimalNumber from '../custom-plugin-components/custom-decimal-number/custom-decimal-number';
import React from 'react';
import CustomComboSection from '../custom-plugin-components/custom-combo-section/custom-combo-section';
import { UseFormReturnType } from '@mantine/form';
import { CustomRadioSection } from '../custom-plugin-components/custom-radio-section/custom-radio-section';
import CustomSection from '../custom-plugin-components/custom-section/custom-section';

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
  switch (field.type) {
    case PluginConfigurationSchemaType.String:
      return (
        <CustomStringInput
          form={form}
          pluginConfigurationSchema={field}
          pluginKey={pluginKey}
        />
      );
    case PluginConfigurationSchemaType.Integer:
      return (
        <CustomIntegerInput
          form={form}
          pluginConfigurationSchemaField={field}
          pluginKey={pluginKey}
        />
      );
    case PluginConfigurationSchemaType.Enum:
      return (
        <CustomEnumSelect
          form={form}
          pluginConfigurationSchemaField={field}
          pluginKey={pluginKey}
        />
      );
    case PluginConfigurationSchemaType.Boolean:
      return (
        <CustomBoolCheckbox
          form={form}
          pluginConfigurationSchemaField={field}
          pluginKey={pluginKey}
        />
      );
    case PluginConfigurationSchemaType.Decimal:
      return (
        <CustomDecimalNumber
          form={form}
          pluginConfigurationSchemaField={field}
          pluginKey={pluginKey}
        />
      );
    case PluginConfigurationSchemaType.ComboSection:
      return (
        <CustomComboSection
          form={form}
          pluginConfigurationSchemaField={field}
          pluginKey={pluginKey}
        />
      );
    case PluginConfigurationSchemaType.RadioSection:
      return (
        <CustomRadioSection
          form={form}
          pluginConfigurationSchemaField={field}
          pluginKey={pluginKey}
        />
      );
    case PluginConfigurationSchemaType.Section:
      return (
        <CustomSection
          form={form}
          pluginConfigurationSchemaField={field}
          pluginKey={pluginKey}
        />
      );
    default:
      return null;
  }
}
