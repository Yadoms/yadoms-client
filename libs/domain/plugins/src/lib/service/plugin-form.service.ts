import {
  PluginConfigurationSchema,
  PluginConfigurationSchemaType,
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
const getFromInitialValues = (
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
        newInitialValues[key] = field.defaultValue;
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
      default:
        break;
    }
  }

  return newInitialValues;
};
