export enum PluginConfigurationSchemaType {
  String = 'string',
  Integer = 'int',
  Boolean = 'bool',
  Decimal = 'decimal',
  Section = 'section',
  CustomTime = 'time',
  Enum = 'enum',
  ComboSection = 'comboSection',
  RadioSection = 'radioSection',
  CheckboxSection = 'checkboxSection',
  MultiSelectSection = 'multiSelectSection',
}

interface BaseField {
  type: PluginConfigurationSchemaType;
  name?: string;
  description?: string;
  placeholder?: string;
  defaultValue?: number | boolean | string;
  value: number | boolean | string;
  required?: boolean;
  encrypted?: boolean;
}

export interface StringField extends BaseField {
  type: PluginConfigurationSchemaType.String;
  regex?: string;
  regexErrorMessage?: string;
  maximumLength?: number;
}

interface NumberConstraints {
  minimumValue?: number;
  maximumValue?: number;
  /** Bypasses the minimum and maximum checks */
  disableCheck?: boolean;
  step?: number;
}

export interface IntegerField extends BaseField, NumberConstraints {
  type: PluginConfigurationSchemaType.Integer;
}

export interface BooleanField extends BaseField {
  type: PluginConfigurationSchemaType.Boolean;
}

export interface SectionField extends BaseField {
  type: PluginConfigurationSchemaType.Section;
  content: PluginSectionConfigurationSchema;
}

export interface ComboSectionField extends BaseField {
  type: PluginConfigurationSchemaType.ComboSection;
  activeSection: string;
  content: PluginSectionConfigurationSchema;
}

export interface RadioSectionField extends BaseField {
  type: PluginConfigurationSchemaType.RadioSection;
  activeSection: string;
  content: PluginSectionConfigurationSchema;
}

export interface CheckboxSectionField extends BaseField {
  type: PluginConfigurationSchemaType.CheckboxSection;
  content: PluginSectionConfigurationSchema;
  checkbox?: boolean;
}

export interface CustomTimeField extends BaseField {
  type: PluginConfigurationSchemaType.CustomTime;
}

export interface EnumField extends BaseField {
  type: PluginConfigurationSchemaType.Enum;
  values: { [key: string]: number | string | boolean };
  nothingFound?: string;
}

export interface DecimalField extends BaseField, NumberConstraints {
  type: PluginConfigurationSchemaType.Decimal;
  precision?: number;
}

export interface MultiSelectSectionField extends BaseField {
  type: PluginConfigurationSchemaType.MultiSelectSection;
  content: PluginSectionConfigurationSchema;
  nothingFound?: string;
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

export type SectionType =
  | SectionField
  | ComboSectionField
  | RadioSectionField
  | CheckboxSectionField
  | MultiSelectSectionField;

export interface PluginConfigurationSchema {
  [key: string]: PluginConfigurationSchemaField;
}
export interface PluginSectionConfigurationSchema {
  [key: string]: SectionType;
}

export interface PluginMultiSelectSectionConfigurationSchema {
  [key: string]: {
    defaultValue: boolean;
    name: string;
    description: string;
  };
}
