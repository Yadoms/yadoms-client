import { PluginConfigurationSchema } from '@yadoms/domain/plugins';

export const validateForm = (
  values: Record<string, any>,
  schema: PluginConfigurationSchema
) => {
  const errors: Record<string, string> = {};
  const validateField = (key: string, value: any, field: any) => {
    if (field.required && (!value || value.trim() === '')) {
      errors[key] = `${field.name} is required`;
    }
    if (field.regex && !new RegExp(field.regex).test(value)) {
      errors[key] = field.regexErrorMessage || `${field.name} is invalid`;
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
  return errors;
};
