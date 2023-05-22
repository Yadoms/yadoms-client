export enum PluginConfigurationSchemaType {
  String = 'string',
  Integer = 'int',
  Boolean = 'bool',
  Section = 'section',
  ComboSection = 'comboSection',
  RadioSection = 'radioSection',
  CheckboxSection = 'checkboxSection',
  CustomTime = 'time',
  Enum = 'enum',
  Decimal = 'decimal',
  MultiSelectSection = 'multiSelectSection',
}

interface BaseField {
  type: PluginConfigurationSchemaType;
  description?: string;
  placeholder?: string;
  defaultValue?: number | boolean | string;
  required?: boolean;
  encrypted?: boolean;
}

export interface StringField extends BaseField {
  type: PluginConfigurationSchemaType.String;
  regex?: string;
  regexErrorMessage?: string;
}

export interface IntegerField extends BaseField {
  type: PluginConfigurationSchemaType.Integer;
  step?: number;
}

export interface BooleanField extends BaseField {
  type: PluginConfigurationSchemaType.Boolean;
}

export interface SectionField extends BaseField {
  type: PluginConfigurationSchemaType.Section;
}

export interface ComboSectionField extends BaseField {
  type: PluginConfigurationSchemaType.ComboSection;
}

export interface RadioSectionField extends BaseField {
  type: PluginConfigurationSchemaType.RadioSection;
}

export interface CheckboxSectionField extends BaseField {
  type: PluginConfigurationSchemaType.CheckboxSection;
}

export interface CustomTimeField extends BaseField {
  type: PluginConfigurationSchemaType.CustomTime;
}

export interface EnumField extends BaseField {
  type: PluginConfigurationSchemaType.Enum;
  values: { [key: string]: number | string | boolean };
  nothingFound?: string;
}

export interface DecimalField extends BaseField {
  type: PluginConfigurationSchemaType.Decimal;
  precision?: number;
  step?: number;
}

export interface MultiSelectSectionField extends BaseField {
  type: PluginConfigurationSchemaType.MultiSelectSection;
}

export type PluginConfigurationSchemaField =
  | StringField
  | IntegerField
  | BooleanField
  | SectionField
  | ComboSectionField
  | RadioSectionField
  | CheckboxSectionField
  | CustomTimeField
  | EnumField
  | DecimalField
  | MultiSelectSectionField;

export interface PluginConfigurationSchema {
  [key: string]: {
    pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  };
}
