import {
  Button,
  Flex,
  Modal,
  ScrollArea,
  Space,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getFromInitialValues,
  validateForm,
} from './plugins-configuration-forms';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import renderPluginField from '../render-plugin-field/render-plugin-field';
import { PluginConfigurationSchema } from '@yadoms/domain/plugins';

export interface PluginConfigurationModalProps {
  opened: boolean;
  onClose: () => void;
  selectedPluginConfigurationSchema: PluginConfigurationSchema;
  selectedPluginType: string;
}

export interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label?: string;
  value: string;
  description?: string;
}

export function PluginConfigurationModal(props: PluginConfigurationModalProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation();

  const [initialValues, setInitialValues] = useState<Record<string, any>>({});

  useEffect(() => {
    // Create initial values object based on configuration schema
    const newInitialValues = getFromInitialValues(
      props.selectedPluginConfigurationSchema
    );
    console.log(
      'props.selectedPluginConfigurationSchema',
      props.selectedPluginConfigurationSchema
    );
    console.log('newInitialValues', newInitialValues);
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
                ([key, value]) =>
                  renderPluginField({
                    field: value,
                    form: form,
                    pluginKey: key,
                  })
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
