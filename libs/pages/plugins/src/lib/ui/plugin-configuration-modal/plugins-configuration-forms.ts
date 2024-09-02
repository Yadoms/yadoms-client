import { PluginConfigurationSchemaType } from '@yadoms/domain/plugins';

export const validateForm: (
  values: Record<string, any>
) => Record<string, string> = (values: Record<string, any>) => {
  const errors: Record<string, string> = {};

  const validateObject = (
    values: Record<string, any>,
    path = 'configuration'
  ) => {
    Object.entries(values).forEach(([key, field]) => {
      const currentPath = `${path}.${key}`;
      console.log('key', key);
      console.log('field', field);
      console.log('field.type', field.type);
      let sectionKeys: string[] = [];
      let firstSectionKey = '';

      switch (field.type) {
        case PluginConfigurationSchemaType.String:
          if (field.required && field.value?.trim() === '') {
            errors[`${currentPath}.value`] = `${field.name} is required`;
          }
          if (field.regex && !new RegExp(field.regex).test(field.value)) {
            errors[`${currentPath}.value`] =
              field.regexErrorMessage || `${field.name} is invalid`;
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
          break;

        case PluginConfigurationSchemaType.Decimal:
          if (
            field.value === null ||
            field.value === undefined ||
            field.value === ''
          ) {
            errors[`${currentPath}.value`] = `${field.name} is required`;
          }
          break;

        case PluginConfigurationSchemaType.CheckboxSection:
          if (!field.checkbox) {
            break;
          }
          validateObject(field.content, `${currentPath}.content`);
          break;

        case PluginConfigurationSchemaType.ComboSection:
          sectionKeys = Object.keys(field.content);
          firstSectionKey = sectionKeys[0];
          console.log('sectionKeys', sectionKeys);
          console.log('firstSectionKey', firstSectionKey);
          console.log('field.content', field.content[sectionKeys[0]]);
          console.log(
            '${currentPath}.content.${firstSectionKey}.content',
            `${currentPath}.content.${firstSectionKey}`
          );
          validateObject(
            field.content[sectionKeys[0]],
            `${currentPath}.content.${firstSectionKey}`
          );
          break;
        case PluginConfigurationSchemaType.Section:
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
