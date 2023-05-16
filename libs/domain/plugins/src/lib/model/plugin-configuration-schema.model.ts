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
  MultiSelectSection = 'multiselectSection',
}

export interface PluginConfigurationSchemaField {
  type?: PluginConfigurationSchemaType;
  regex?: string;
  regexErrorMessage?: string;
  description?: string;
  name?: string;
  required?: boolean;
  encrypted?: boolean;
  precision?: number;
  step?: number;
  defaultValue?: number | boolean | string;
  enableWithCheckBox?: boolean;
  checkbox?: {
    defaultValue: boolean;
  };
  values: {
    [key: string]: number | string | boolean;
  };
  content?: PluginConfigurationSchema;
}
export interface PluginConfigurationSchema {
  [key: string]: {
    pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  };
}
