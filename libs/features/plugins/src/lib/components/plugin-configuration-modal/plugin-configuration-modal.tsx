import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
  NumberInput,
  Radio,
  ScrollArea,
  Select,
  Space,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import React, { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getFromInitialValues,
  validateForm,
} from './plugins-configuration-forms';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

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

export interface PluginConfigurationModalProps {
  opened: boolean;
  onClose: () => void;
  selectedPluginConfigurationSchema: PluginConfigurationSchema;
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
export function PluginConfigurationModal(props: PluginConfigurationModalProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation();

  const [initialValues, setInitialValues] = useState<Record<string, any>>({});

  useEffect(() => {
    // Create initial values object based on configuration schema
    const newInitialValues = getFromInitialValues(
      props.selectedPluginConfigurationSchema
    );
    setInitialValues(newInitialValues);
  }, [props.selectedPluginConfigurationSchema]);

  const form = useForm({
    initialValues,
    validate: (values) =>
      validateForm(values, props.selectedPluginConfigurationSchema),
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

  function getRadioSectionData(field: any) {
    // const data = [];
    return Object.entries(field.content).map(([key, value]) => (
      <Radio value={value.name} label={value.name} />
    ));
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
      case 'enum':
        return (
          <Select
            label={field.name}
            description={field.description}
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            // defaultValue={getComboSectionData(field)[0].label}
            data={[]}
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
      case 'radioSection':
        return (
          <Radio.Group
            name={field.name}
            label={field.name}
            description={field.description}
            withAsterisk
          >
            <Group mt="xs">{getRadioSectionData(field)}</Group>
          </Radio.Group>
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
    <Modal.Root
      onClose={props.onClose}
      opened={props.opened}
      size="95%"
      zIndex={1000}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Modal.Overlay opacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            {t('plugins.modal.plugin-configuration.title')}
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
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
              {Object.entries(props.selectedPluginConfigurationSchema).map(
                ([key, value]) => renderField(key, value)
              )}
              {renderSpacing(6)}
            </Flex>

            <Flex
              mih={50}
              gap="xs"
              justify="flex-end"
              align="center"
              direction="row"
              wrap="wrap"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'white',
                padding: '20px',
              }}
            >
              <Button onClick={props.onClose} variant={'outline'}>
                {t('plugins.modal.plugin-configuration.back')}
              </Button>
              <Button onClick={onSubmit} type="submit">
                {t('plugins.modal.plugin-configuration.create')}
              </Button>
            </Flex>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

function renderSpacing(numberOfSpace: number): React.ReactNode {
  const spaces = [];

  for (let i = 0; i < numberOfSpace; i++) {
    spaces.push(<Space key={i} w="xl" />);
  }

  return spaces;
}

export default PluginConfigurationModal;
