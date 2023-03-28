import { NumberInput, TextInput, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

export interface PluginConfigurationSchema {
  [key: string]: {
    type?:
      | 'string'
      | 'int'
      | 'bool'
      | 'section'
      | 'comboSection'
      | 'radioSection'
      | 'enum';
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
  };
}

interface PluginConfigurationProps {
  configurationSchema: PluginConfigurationSchema;
  selectedPluginType: string;
}

export function PluginConfiguration(props: PluginConfigurationProps) {
  const theme = useMantineTheme();
  let validationPattern: RegExp;

  const [initialValues, setInitialValues] = useState<Record<string, any>>({});

  useEffect(() => {
    // Create initial values object based on configuration schema
    const newInitialValues: Record<string, any> = {};
    console.log('props.configurationSchema', props.configurationSchema);
    Object.entries(props.configurationSchema).forEach(([key, field]) => {
      console.log('key', key);
      console.log('field', field);

      newInitialValues[key] = '';
      console.log('newInitialValues[key]', newInitialValues[key]);
      if (field.defaultValue !== undefined) {
        newInitialValues[key] = field.defaultValue;
      }
      if (field.type === 'section') {
        Object.entries(field.content || {}).forEach(([subKey, subField]) => {
          if (subField.defaultValue !== undefined) {
            newInitialValues[`${key}.${subKey}`] = subField.defaultValue;
          }
        });
      }
    });
    console.log('newInitialValues', newInitialValues);
    setInitialValues(newInitialValues);
  }, [props.configurationSchema]);

  const form = useForm<Record<string, any>>({
    initialValues,
    validate: (values) => validateForm(values, props.configurationSchema),
  });

  const onSubmit = () => {
    const errorValues = Object.values(form.errors);
    if (errorValues.length === 0) {
      // handle successful form submission
      notifications.show({
        title: 'Form submitted',
        message: 'Your form has been submitted successfully.',
        color: theme.colors.green[6],
      });
    } else {
      console.log('form', form);
      // handle validation errors
      notifications.show({
        title: 'Validation error',
        message: 'Please fix the errors in the form and try again.',
        color: 'red',
      });
    }
  };

  const validateForm = (
    values: Record<string, any>,
    schema: PluginConfigurationSchema
  ) => {
    const errors: Record<string, string> = {};

    const validateField = (key: string, value: any, field: any) => {
      if (field.required && (!value || value.trim() === '')) {
        errors[key] = `${field.name} is required`;
      } else if (field.regex && !new RegExp(field.regex).test(value)) {
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

  const renderField = (key: string, field: any) => {
    switch (field.type) {
      case 'string':
        return (
          <TextInput
            label={field.name}
            placeholder={field.name}
            description={field.description}
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            withAsterisk={!!field.required}
            {...form.getInputProps(key)}
            required={field.required}

            // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            //   validationPattern = new RegExp(field.regex);
            //   console.log('event.currentTarget.value', event.currentTarget.value);
            //   form.setFieldValue(key, event.currentTarget.value);
            //   console.log('form', form);
            // }}

            // onBlur={() => {
            //   if (field.regex) {
            //     console.log('field.pattern', field.regex);
            //     validationPattern = new RegExp(field.regex); // create regex object
            //     console.log('Validation pattern set to:', validationPattern);
            //     form.setFieldError(key, field.regexErrorMessage); // pass regex as second argument
            //   }
            // }}
          />
        );
      case 'int':
        return (
          <NumberInput
            label={field.name}
            description={field.description}
            placeholder={field.name}
            defaultValue={field.defaultValue}
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            withAsterisk={!!field.required}
            min={0}
          />
        );
      case 'section':
        return (
          <div key={key}>
            <label>{key}</label>
            <div style={{ marginLeft: '20px' }}>
              {field.content &&
                Object.entries(field.content).map(([key, value]) =>
                  renderField(key, value)
                )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TextInput
        label="Name"
        placeholder="Plugin name"
        defaultValue={props.selectedPluginType}
        description="custom plugin Name"
        inputWrapperOrder={['label', 'error', 'input', 'description']}
        withAsterisk
      />
      {Object.entries(props.configurationSchema).map(([key, value]) =>
        renderField(key, value)
      )}
      <button onClick={onSubmit} type="submit">
        Submit
      </button>
    </form>
  );
}

export default PluginConfiguration;
