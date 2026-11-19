import {
  DecimalField,
  IntegerField,
  numberLimits,
  PluginConfigurationSchemaType,
} from '@yadoms/domain/plugins';

export const validateForm: (
  values: Record<string, any>
) => Record<string, string> = (values: Record<string, any>) => {
  const errors: Record<string, string> = {};

  const validateLimits = (
    field: IntegerField | DecimalField,
    valuePath: string
  ) => {
    if (field.value === null || field.value === undefined || field.value === '')
      return;
    const value = Number(field.value);
    const { min, max } = numberLimits(field);
    if (min !== undefined && value < min) {
      errors[
        valuePath
      ] = `${field.name} must be greater than or equal to ${min}`;
    } else if (max !== undefined && value > max) {
      errors[valuePath] = `${field.name} must be less than or equal to ${max}`;
    }
  };

  const validateObject = (
    values: Record<string, any>,
    path = 'configuration'
  ) => {
    Object.entries(values).forEach(([key, field]) => {
      const currentPath = `${path}.${key}`;
      console.log('key', key);
      console.log('field', field);
      console.log('field.type', field.type);

      switch (field.type) {
        case PluginConfigurationSchemaType.String:
          if (field.required && field.value?.trim() === '') {
            errors[`${currentPath}.value`] = `${field.name} is required`;
          }
          if (field.regex && !new RegExp(field.regex).test(field.value)) {
            errors[`${currentPath}.value`] =
              field.regexErrorMessage || `${field.name} is invalid`;
          }
          if (
            field.maximumLength !== undefined &&
            (field.value ?? '').length > field.maximumLength
          ) {
            errors[
              `${currentPath}.value`
            ] = `${field.name} must not exceed ${field.maximumLength} characters`;
          }
          break;

        case PluginConfigurationSchemaType.Integer:
          if (
            field.required &&
            (field.value === null ||
              field.value === undefined ||
              field.value === '')
          ) {
            errors[`${currentPath}.value`] = `${field.name} is required`;
          }
          if (field.regex && !new RegExp(field.regex).test(field.value)) {
            errors[`${currentPath}.value`] =
              field.regexErrorMessage || `${field.name} is invalid`;
          }
          validateLimits(field, `${currentPath}.value`);
          break;

        case PluginConfigurationSchemaType.Decimal:
          validateLimits(field, `${currentPath}.value`);
          if (
            field.required &&
            (field.value === null ||
              field.value === undefined ||
              field.value === '')
          ) {
            errors[`${currentPath}.value`] = `${field.name} is required`;
          }
          break;

        case PluginConfigurationSchemaType.Enum:
          if (
            field.required &&
            (field.value === null ||
              field.value === undefined ||
              field.value === '')
          ) {
            errors[`${currentPath}.value`] = `${field.name} is required`;
          }
          break;

        case PluginConfigurationSchemaType.Section:
          console.log('section currentPath', currentPath);
          validateObject(field.content, `${currentPath}.content`);
          break;
        default:
          break;
      }
    });
  };

  validateObject(values['configuration']);

  console.log('errors', errors);
  return errors;
};
