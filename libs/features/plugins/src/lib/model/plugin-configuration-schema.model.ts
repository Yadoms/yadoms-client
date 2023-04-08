export enum PluginConfigurationSchemaType {
  String = 'string',
  Integer = 'int',
  Boolean = 'bool',
  Section = 'section',
  ComboSection = 'comboSection',
  RadioSection = 'radioSection',
  Enum = 'enum',
  Decimal = 'decimal',
}

export interface PluginConfigurationSchemaField {
  type?: PluginConfigurationSchemaType;
  regex?: string;
  regexErrorMessage?: string;
  description?: string;
  name?: string;
  required?: boolean | string;
  encrypted?: boolean;
  defaultValue?: number | boolean | string;
  enableWithCheckBox?: boolean;
  checkbox?: {
    defaultValue: boolean;
  };
  content?: PluginConfigurationSchema;
}
export interface PluginConfigurationSchema {
  [key: string]: {
    pluginConfigurationSchemaField: PluginConfigurationSchemaField;
  };
}
