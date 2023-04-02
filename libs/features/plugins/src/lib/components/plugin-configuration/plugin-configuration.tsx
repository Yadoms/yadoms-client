import {
  Box,
  Text,
  Button,
  Group,
  NumberInput,
  Select,
  TextInput,
  useMantineTheme,
  Flex,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { forwardRef, useEffect, useState } from 'react';
import {
  getFromInitialValues,
  validateForm,
} from './plugins-configuration-forms';

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

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  value: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);
export function PluginConfiguration(props: PluginConfigurationProps) {
  const theme = useMantineTheme();

  const [initialValues, setInitialValues] = useState<Record<string, any>>({});

  useEffect(() => {
    // Create initial values object based on configuration schema
    const newInitialValues = getFromInitialValues(props.configurationSchema);
    setInitialValues(newInitialValues);
  }, [props.configurationSchema]);

  const form = useForm({
    initialValues,
    validate: (values) => validateForm(values, props.configurationSchema),
  });

  const onSubmit = () => {
    console.log(form.values);
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

  function getComboSectionData(field: any) {
    const data: ItemProps[] = [];
    Object.entries(field.content).map(([key, value]) => {
      data.push({
        description: value.description,
        value: value.name,
        label: value.name,
      });
    });

    return data;
  }

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
            //   // validationPattern = new RegExp(field.regex);
            //   console.log('event.currentTarget.value', event.currentTarget.value);
            //   form.setFieldValue(key, event.currentTarget.value);
            //   console.log('form', form);
            // }}
            //
            // onBlur={() => {
            //   if (field.regex) {
            //     // validationPattern = new RegExp(field.regex); // create regex object
            //
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
      case 'comboSection':
        return (
          <Box
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[5]
                  : theme.colors.gray[1],
              textAlign: 'left',
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
            })}
          >
            <Select
              label={field.name}
              description={field.description}
              inputWrapperOrder={['label', 'error', 'input', 'description']}
              defaultValue={getComboSectionData(field)[0].label}
              itemComponent={SelectItem}
              data={getComboSectionData(field)}
            />
            {field.content &&
              Object.entries(field.content).map(([key, value]) =>
                renderField(key, value)
              )}
          </Box>
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
      onSubmit={form.onSubmit((values) => {
        console.log('form', form);
        console.log(values);
      })}
    >
      <Flex direction={'column'} gap={10}>
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
      </Flex>

      <Button onClick={onSubmit} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default PluginConfiguration;
