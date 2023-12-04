import {
  EnumField,
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
    let firstSectionKey: string | undefined;

    switch (field.type) {
      case PluginConfigurationSchemaType.String:
        newInitialValues[key] = field.defaultValue ?? '';
        break;
      case PluginConfigurationSchemaType.Integer:
        newInitialValues[key] = field.defaultValue ?? 0;
        break;
      case PluginConfigurationSchemaType.Boolean:
        newInitialValues[key] = field.defaultValue ?? false;
        break;
      case PluginConfigurationSchemaType.Decimal:
        newInitialValues[key] = field.defaultValue ?? 0.0;
        break;
      case PluginConfigurationSchemaType.Enum:
        newInitialValues[key] = getEnumDefaultValue(field);
        break;
      case PluginConfigurationSchemaType.Section:
        newInitialValues[key] = {
          content: getFromInitialValues(field.content || {}),
        };
        break;
      case PluginConfigurationSchemaType.ComboSection:
        sectionKeys = Object.keys(field.content || {});
        if (sectionKeys.length > 0) {
          firstSectionKey = sectionKeys[0];
          newInitialValues[key] = {
            content: getFromInitialValues(field.content || {}),
            activeSection: firstSectionKey,
          };
        } else {
          newInitialValues[key] = {
            content: getFromInitialValues(field.content || {}),
          };
        }
        break;
      case PluginConfigurationSchemaType.CheckboxSection:
        sectionKeys = Object.keys(field.content || {});
        console.log('sectionKeys', sectionKeys);
        if (sectionKeys.length > 0) {
          newInitialValues[key] = {
            content: getFromInitialValues(field.content || {}),
            checkbox: field.defaultValue,
          };
        } else {
          newInitialValues[key] = {
            content: getFromInitialValues(field.content || {}),
          };
        }
        break;
      case PluginConfigurationSchemaType.MultiSelectSection:
        console.log('MultiSelectSection', field);
        newInitialValues[key] = {
          content: getFromInitialValues(field.content || {}),
        };
        break;
      default:
        break;
    }
  }
  return newInitialValues;
};

export const getFromInitialValuesTest = (
  configurationSchema:
    | PluginConfigurationSchema
    | PluginSectionConfigurationSchema
    | PluginMultiSelectSectionConfigurationSchema,
  parentKey = 'configuration'
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
    const path = parentKey ? `${parentKey}.${key}` : key;

    switch (field?.type) {
      case PluginConfigurationSchemaType.Enum:
      case PluginConfigurationSchemaType.String:
      case PluginConfigurationSchemaType.CustomTime:
      case PluginConfigurationSchemaType.Boolean:
      case PluginConfigurationSchemaType.Decimal:
      case PluginConfigurationSchemaType.Integer:
        newInitialValues.push({ key: key, path: path, field: field });
        break;
      case PluginConfigurationSchemaType.Section:
      case PluginConfigurationSchemaType.ComboSection:
      case PluginConfigurationSchemaType.RadioSection:
      case PluginConfigurationSchemaType.CheckboxSection:
      case PluginConfigurationSchemaType.MultiSelectSection:
        newInitialValues.push({ key: key, path: path, field: field });
        break;
      default:
    }
  }
  console.log('newInitialValues getFromInitialValuesTest', newInitialValues);
  return newInitialValues;
};

export const getInitialValuesFromSectionFields = (
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
  const newInitialValues: Array<{
    key: string;
    path: string;
    field: PluginConfigurationSchemaField;
  }> = [];
  console.log(
    'getInitialValuesFromSectionFields configurationSchema',
    configurationSchema
  );
  for (const [key, field] of Object.entries(configurationSchema)) {
    console.log(
      'field?.type',
      typeof PluginConfigurationSchemaType.CheckboxSection
    );
    switch (field?.type) {
      case PluginConfigurationSchemaType.CheckboxSection:
        newInitialValues.push({
          key: key,
          path: `${parentKey}.content.${key}`,
          field: field,
        });
        break;
      default:
        newInitialValues.push({
          key: key,
          path: `${parentKey}.content.${selectedKey}.content.${key}`,
          field: field,
        });
    }
  }
  console.log(
    'getInitialValuesFromSectionFields newInitialValues',
    newInitialValues
  );
  return newInitialValues;
};

function getEnumDefaultValue(field: EnumField): string {
  if (!field.defaultValue) {
    return Object.keys(field.values)[0];
  }
  return field.defaultValue.toString();
}
