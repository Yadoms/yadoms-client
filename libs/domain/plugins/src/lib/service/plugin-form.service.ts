import {
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
  const newInitialValues: Array<{
    key: string;
    path: string;
    field: PluginConfigurationSchemaField;
  }> = [];
  for (const [key, field] of Object.entries(configurationSchema)) {
    switch (field?.type) {
      case PluginConfigurationSchemaType.CheckboxSection:
        newInitialValues.push({
          key: key,
          path: `${parentKey}.content.${key}`,
          field: field,
        });
        break;
      case PluginConfigurationSchemaType.ComboSection:
        newInitialValues.push({
          key: key,
          path: `${parentKey}.${selectedKey}.content.${key}.content`,
          field: field,
        });
        break;
      case PluginConfigurationSchemaType.RadioSection:
        newInitialValues.push({
          key: key,
          path: `${parentKey}.${selectedKey}.content.${key}.content`,
          field: field,
        });
        break;
      case PluginConfigurationSchemaType.Section:
        newInitialValues.push({
          key: key,
          path: `${parentKey}.content.${selectedKey}.content`,
          field: field,
        });
        break;
      case PluginConfigurationSchemaType.Boolean:
        newInitialValues.push({
          key: key,
          path: `${parentKey}.content.${key}.value`,
          field: field,
        });
        break;
      case PluginConfigurationSchemaType.Enum:
        if (selectedKey === '') {
          newInitialValues.push({
            key: key,
            path: `${parentKey}.content.${key}.value`,
            field: field,
          });
        } else {
          newInitialValues.push({
            key: key,
            path: `${parentKey}.${selectedKey}.content.${key}.value`,
            field: field,
          });
        }

        break;
      case PluginConfigurationSchemaType.String:
        if (selectedKey === '') {
          newInitialValues.push({
            key: key,
            path: `${parentKey}.content.${key}.value`,
            field: field,
          });
        } else {
          newInitialValues.push({
            key: key,
            path: `${parentKey}.${selectedKey}.content.${key}.value`,
            field: field,
          });
        }

        break;
      case PluginConfigurationSchemaType.Decimal:
        newInitialValues.push({
          key: key,
          path: `${parentKey}.content.${key}.value`,
          field: field,
        });
        break;
      case PluginConfigurationSchemaType.Integer:
        newInitialValues.push({
          key: key,
          path: `${parentKey}.content.${key}.value`,
          field: field,
        });
        break;
      case PluginConfigurationSchemaType.CustomTime:
        newInitialValues.push({
          key: key,
          path: `${parentKey}.content.${key}.value`,
          field: field,
        });
        break;
      default:
        newInitialValues.push({
          key: key,
          path: `${parentKey}.${selectedKey}.content.${key}.value`,
          field: field,
        });
    }
  }
  return newInitialValues;
};
