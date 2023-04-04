import { PluginConfigurationSchema } from '../plugin-configuration/plugin-configuration';

export function getFromInitialValues(
  configurationSchema: PluginConfigurationSchema
) {
  const newInitialValues: Record<string, any> = {};
  console.log('props.configurationSchema', configurationSchema);
  Object.entries(configurationSchema).forEach(([key, field]) => {
    switch (field.type) {
      case 'string':
        newInitialValues[key] =
          field.defaultValue !== undefined ? field.defaultValue : '';
        break;
      case 'int':
        newInitialValues[key] =
          field.defaultValue !== undefined ? field.defaultValue : 0;
        break;
      case 'section':
        Object.entries(field.content || {}).forEach(([subKey, subField]) => {
          if (subField.defaultValue !== undefined) {
            newInitialValues[`${key}.${subKey}`] = subField.defaultValue;
          }
        });
        break;
      default:
        break;
    }
  });
  console.log('newInitialValuesnewInitialValues', newInitialValues);
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
    } else if (field.regex && !new RegExp(field.regex).test(value)) {
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