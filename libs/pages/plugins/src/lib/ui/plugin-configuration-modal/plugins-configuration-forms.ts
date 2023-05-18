import {
  PluginConfigurationSchema,
  PluginConfigurationSchemaField,
  PluginConfigurationSchemaType,
} from '@yadoms/domain/plugins';

export type InitialValues = {
  [key: string]: string | number | boolean;
};
export function getFromInitialValues({
  content,
  ...schema
}: PluginConfigurationSchemaField): InitialValues {
  const newInitialValues: InitialValues = {};
  for (const [key, field] of Object.entries(schema)) {
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
      case PluginConfigurationSchemaType.Section:
        for (const [subKey, subField] of Object.entries(content || {})) {
          if (subField.defaultValue !== undefined) {
            newInitialValues[`${key}.${subKey}`] = subField.defaultValue;
          }
        }
        break;
      default:
        break;
    }
  }
  return newInitialValues;
}

export const validateForm = (
  values: Record<string, any>,
  schema: PluginConfigurationSchema
) => {
  const errors: Record<string, string> = {};
  console.log('validateForm', values);
  const validateField = (key: string, value: any, field: any) => {
    console.log('validateField key', key);
    console.log('validateField value', value);
    console.log('validateField field', field);
    if (field.required && (!value || value.trim() === '')) {
      errors[key] = `${field.name} is required`;
    }
    if (field.regex && !new RegExp(field.regex).test(value)) {
      errors[key] = field.regexErrorMessage || `${field.name} is invalid`;
      console.log('errors[key]', errors[key]);
    }
  };

  const validateObject = (
    obj: Record<string, any>,
    schema: PluginConfigurationSchema
  ) => {
    Object.entries(schema).forEach(([key, field]) => {
      if (field.type === 'section') {
        validateObject(obj[key] || {}, field.content || {});
      } else {
        validateField(key, obj[key], field);
      }
    });
  };

  validateObject(values, schema);
  console.log('errors', errors);
  return errors;
};
