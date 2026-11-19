import {
  DecimalField,
  IntegerField,
  PluginConfigurationSchema,
  PluginConfigurationSchemaField,
  PluginConfigurationSchemaType,
  PluginMultiSelectSectionConfigurationSchema,
  PluginSectionConfigurationSchema,
} from '../model/plugin-configuration-schema.model';

export interface InitialValues {
  type: string;
  displayName: string;
  configurationSchema: PluginConfigurationSchema;
}

export const getInitialValues = (initialValues: InitialValues) => {
  return {
    type: initialValues.type,
    displayName: initialValues.displayName,
    configuration: getFromInitialValues(initialValues.configurationSchema),
  };
};

export const getFromInitialValues = (
  configurationSchema: PluginConfigurationSchema
): Record<string, unknown> => {
  const newInitialValues: Record<string, unknown> = {};

  for (const [key, field] of Object.entries(configurationSchema)) {
    let sectionKeys: string[] = [];
    let firstSectionKey = '';
    let radioSectionKeys: string[] = [];
    let radioSectionfirstSectionKey = '';

    switch (field.type) {
      case PluginConfigurationSchemaType.String:
      case PluginConfigurationSchemaType.Integer:
      case PluginConfigurationSchemaType.Boolean:
      case PluginConfigurationSchemaType.Decimal:
      case PluginConfigurationSchemaType.Enum:
      case PluginConfigurationSchemaType.CustomTime:
        newInitialValues[key] = {
          ...field,
          value: field.defaultValue ?? field.value,
        };
        break;
      case PluginConfigurationSchemaType.Section:
        newInitialValues[key] = {
          ...field,
          ...(field.content && {
            content: getFromInitialValues(field.content),
          }),
        };
        break;
      case PluginConfigurationSchemaType.ComboSection:
        sectionKeys = Object.keys(field.content);
        firstSectionKey = sectionKeys[0];
        newInitialValues[key] = {
          ...field,
          content: getFromInitialValues(field.content),
          ...(field.activeSection ? {} : { activeSection: firstSectionKey }),
        };
        break;
      case PluginConfigurationSchemaType.CheckboxSection:
        newInitialValues[key] = {
          ...field,
          content: getFromInitialValues(field.content),
          ...(field.defaultValue && { checkbox: field.defaultValue }),
        };
        break;
      case PluginConfigurationSchemaType.MultiSelectSection:
        newInitialValues[key] = {
          ...field,
          content: getFromInitialValues(field.content),
        };
        break;
      case PluginConfigurationSchemaType.RadioSection:
        radioSectionKeys = Object.keys(field.content);
        radioSectionfirstSectionKey = radioSectionKeys[0];
        newInitialValues[key] = {
          ...field,
          content: getFromInitialValues(field.content),
          ...(field.activeSection
            ? {}
            : { activeSection: radioSectionfirstSectionKey }),
        };
        break;
      default:
        break;
    }
  }
  return newInitialValues;
};

export const numberLimits = (
  field: IntegerField | DecimalField
): { min?: number; max?: number } =>
  field.disableCheck
    ? {}
    : { min: field.minimumValue, max: field.maximumValue };

/**
 * Fills the values missing from a configuration schema merged with the
 * current values, the same way the server does when merging
 */
export const withDefaultValues = <T extends object>(
  configurationSchema: T
): T => {
  if (!configurationSchema || typeof configurationSchema !== 'object')
    return configurationSchema;

  const result: Record<string, unknown> = {};
  for (const [key, field] of Object.entries(
    configurationSchema as Record<string, PluginConfigurationSchemaField>
  )) {
    switch (field?.type) {
      case PluginConfigurationSchemaType.String:
      case PluginConfigurationSchemaType.CustomTime:
        result[key] = {
          ...field,
          value: field.value ?? field.defaultValue ?? '',
        };
        break;
      case PluginConfigurationSchemaType.Boolean:
        result[key] = {
          ...field,
          value: field.value ?? field.defaultValue ?? false,
        };
        break;
      case PluginConfigurationSchemaType.Integer:
      case PluginConfigurationSchemaType.Decimal:
        result[key] = {
          ...field,
          value: field.value ?? field.defaultValue ?? '',
        };
        break;
      case PluginConfigurationSchemaType.Enum:
        result[key] = {
          ...field,
          value:
            field.value ??
            field.defaultValue ??
            Object.keys(field.values ?? {})[0] ??
            '',
        };
        break;
      case PluginConfigurationSchemaType.Section:
      case PluginConfigurationSchemaType.ComboSection:
      case PluginConfigurationSchemaType.RadioSection:
        result[key] = { ...field, content: withDefaultValues(field.content) };
        break;
      case PluginConfigurationSchemaType.CheckboxSection:
        result[key] = {
          ...field,
          content: withDefaultValues(field.content),
          checkbox: field.checkbox ?? field.defaultValue ?? false,
        };
        break;
      default:
        result[key] = field;
        break;
    }
  }
  return result as T;
};

export const getFromInitialValuesTest = (
  configurationSchema:
    | PluginConfigurationSchema
    | PluginSectionConfigurationSchema
    | PluginMultiSelectSectionConfigurationSchema
): Array<{
  key: string;
  path: string;
  field: PluginConfigurationSchemaField;
}> => {
  const newInitialValues: Array<{
    key: string;
    path: string;
    field: PluginConfigurationSchemaField;
  }> = [];
  for (const [key, field] of Object.entries(configurationSchema)) {
    const path = `configuration.${key}`;

    switch (field?.type) {
      case PluginConfigurationSchemaType.Enum:
      case PluginConfigurationSchemaType.String:
      case PluginConfigurationSchemaType.CustomTime:
      case PluginConfigurationSchemaType.Boolean:
      case PluginConfigurationSchemaType.Decimal:
      case PluginConfigurationSchemaType.Integer:
        newInitialValues.push({
          key: key,
          path: `${path}.value`,
          field: field,
        });
        break;

      case PluginConfigurationSchemaType.CheckboxSection:
        newInitialValues.push({
          key: key,
          path: `${path}`,
          field: field,
        });
        break;
      case PluginConfigurationSchemaType.Section:
      case PluginConfigurationSchemaType.ComboSection:
      case PluginConfigurationSchemaType.RadioSection:
      case PluginConfigurationSchemaType.MultiSelectSection:
        newInitialValues.push({ key: key, path: path, field: field });
        break;
      default:
    }
  }
  return newInitialValues;
};

export const getNestedSectionFields = (
  configurationSchema:
    | PluginSectionConfigurationSchema
    | PluginMultiSelectSectionConfigurationSchema,
  parentKey = '',
  selectedKey: string
): Array<{
  key: string;
  path: string;
  field: PluginConfigurationSchemaField;
}> => {
  const basePath = selectedKey
    ? `${parentKey}.${selectedKey}.content`
    : `${parentKey}.content`;
  return Object.entries(configurationSchema).map(([key, field]) => {
    const fieldPath = `${basePath}.${key}`;
    switch (field?.type) {
      case PluginConfigurationSchemaType.Section:
      case PluginConfigurationSchemaType.ComboSection:
      case PluginConfigurationSchemaType.RadioSection:
      case PluginConfigurationSchemaType.CheckboxSection:
      case PluginConfigurationSchemaType.MultiSelectSection:
        return { key, path: fieldPath, field };
      default:
        return {
          key,
          path: `${fieldPath}.value`,
          field: field as PluginConfigurationSchemaField,
        };
    }
  });
};
