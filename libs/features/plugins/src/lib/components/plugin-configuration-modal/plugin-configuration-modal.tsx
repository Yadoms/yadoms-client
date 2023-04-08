import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
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
import {
  PluginConfigurationSchema,
  PluginConfigurationSchemaField,
  PluginConfigurationSchemaType,
} from '../../model/plugin-configuration-schema.model';
import CustomStringInput from '../custom-plugin-components/custom-string-input/custom-string-input';
import CustomIntegerInput from '../custom-plugin-components/custom-integer-input/custom-integer-input';
import CustomEnumSelect from '../custom-plugin-components/custom-enum-select/custom-enum-select';
import CustomBoolCheckbox from '../custom-plugin-components/custom-bool-checkbox/CustomBoolCheckbox';
import CustomDecimalNumber from '../custom-plugin-components/custom-decimal-number/custom-decimal-number';

export interface PluginConfigurationModalProps {
  opened: boolean;
  onClose: () => void;
  selectedPluginConfigurationSchema: PluginConfigurationSchemaField;
  selectedPluginType: string;
}

export interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  value: string;
  description?: string;
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
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedComboSection, setSelectedComboSection] = useState('');

  useEffect(() => {
    // Create initial values object based on configuration schema
    const newInitialValues = getFromInitialValues(
      props.selectedPluginConfigurationSchema
    );
    setInitialValues(newInitialValues);

    // Set default value for fields of type 'enum'
    Object.entries(props.selectedPluginConfigurationSchema).forEach(
      ([key, field]) => {
        let data;
        let defaultValue;
        console.log('field.pluginConfigurationSchemaField.type', field);
        switch (field.type) {
          case 'radioSection':
            data = getRadioSectionData(field);
            defaultValue = data.length > 0 ? data[0].value : undefined;
            setSelectedOption(defaultValue);
            break;
          case 'comboSection':
            data = getComboSectionData(field);
            defaultValue = data.length > 0 ? data[0].value : undefined;
            setSelectedComboSection(defaultValue);
            break;
          default:
            break;
        }
      }
    );
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

  function getComboSectionData(field: PluginConfigurationSchema) {
    const data: ItemProps[] = [];
    Object.entries(field.content).map(([key, value]) => {
      data.push({
        value: key,
        description: value.description,
        label: value.name,
      });
    });
    return data;
  }

  function getRadioSectionData(field: PluginConfigurationSchema): ItemProps[] {
    const data: ItemProps[] = [];
    Object.entries(field.content).map(([key, value]) => {
      data.push({
        value: key,
        label: value.name,
      });
    });

    return data;
  }

  function renderRadioSection(field: PluginConfigurationSchemaField) {
    return getRadioSectionData(field).map((radioSectionData) => (
      <Radio value={radioSectionData.value} label={radioSectionData.label} />
    ));
  }

  const renderField = (key: string, field: PluginConfigurationSchemaField) => {
    switch (field.type) {
      case PluginConfigurationSchemaType.String:
        return (
          <CustomStringInput
            form={form}
            pluginConfigurationSchema={field}
            pluginKey={key}
          />
        );
      case PluginConfigurationSchemaType.Integer:
        return (
          <CustomIntegerInput
            form={form}
            pluginConfigurationSchemaField={field}
            pluginKey={key}
          />
        );
      case PluginConfigurationSchemaType.Enum:
        return (
          <CustomEnumSelect
            form={form}
            pluginConfigurationSchemaField={field}
            pluginKey={key}
          />
        );
      case PluginConfigurationSchemaType.Boolean:
        return (
          <CustomBoolCheckbox
            form={form}
            pluginConfigurationSchemaField={field}
            pluginKey={key}
          />
        );
      case PluginConfigurationSchemaType.Decimal:
        return (
          <CustomDecimalNumber
            form={form}
            pluginConfigurationSchemaField={field}
            pluginKey={key}
          />
        );
      case PluginConfigurationSchemaType.ComboSection:
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
              border: 'solid',
            })}
          >
            <Select
              value={selectedComboSection}
              onChange={(event) => setSelectedComboSection(event)}
              label={field.name}
              description={field.description}
              inputWrapperOrder={['label', 'error', 'input', 'description']}
              defaultValue={getComboSectionData(field)[0].label}
              itemComponent={SelectItem}
              data={getComboSectionData(field)}
            />
            {field.content[selectedComboSection] &&
              field.content[selectedComboSection].content && (
                <div>
                  {Object.entries(
                    field.content[selectedComboSection].content
                  ).map(([key, value]) => renderField(key, value))}
                </div>
              )}
          </Box>
        );
      case PluginConfigurationSchemaType.RadioSection:
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
            <Radio.Group
              value={selectedOption}
              onChange={(event) => setSelectedOption(event)}
              name={field.name}
              label={field.name}
              description={field.description}
              withAsterisk
            >
              <Group mt="xs">{renderRadioSection(field)}</Group>
            </Radio.Group>
            {field.content[selectedOption] && (
              <div>
                {Object.entries(field.content[selectedOption].content).map(
                  ([key, value]) => renderField(key, value)
                )}
              </div>
            )}
          </Box>
        );
      case PluginConfigurationSchemaType.Section:
        return (
          <Box
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[5]
                  : theme.colors.gray[1],
              textAlign: 'left',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.md,
              border: 'solid',
            })}
          >
            <div key={key}>
              <label>{field.name}</label>
              <Text fz="xs" color="dark.2">
                {field.description}
              </Text>
              <div style={{ marginLeft: '10px' }}>
                {field.content &&
                  Object.entries(field.content).map(([key, value]) =>
                    renderField(key, value)
                  )}
              </div>
            </div>
          </Box>
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
              sx={(theme) => ({
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
                padding: '20px',
              })}
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
