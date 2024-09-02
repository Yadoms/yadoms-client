import {
  Button,
  Flex,
  LoadingOverlay,
  Modal,
  ScrollArea,
  Space,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validateForm } from './plugins-configuration-forms';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import renderPluginField from '../render-plugin-field/render-plugin-field';
import {
  getFromInitialValuesTest,
  getInitialValues,
  PluginConfigurationSchema,
  pluginsApi,
} from '@yadoms/domain/plugins';
import classes from './plugin-configuration-modal.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';

export interface PluginConfigurationModalProps {
  opened: boolean;
  onClose: () => void;
  selectedPluginConfigurationSchema: PluginConfigurationSchema;
  selectedPluginType: string;
  onCloseAllModals: () => void;
}

export interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label?: string;
  value: string;
  description?: string;
}

export function PluginConfigurationModal(props: PluginConfigurationModalProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation();

  const [loadingOverlayVisible, { toggle }] = useDisclosure(false);

  const mutation = useMutation({
    mutationFn: ({
      type,
      displayName,
      configurationSchema,
    }: {
      type: string;
      displayName: string;
      configurationSchema: Record<string, unknown>;
    }) => {
      return pluginsApi.createPluginsInstance(
        type,
        displayName,
        configurationSchema
      );
    },
    onMutate: (variables) => {
      // A mutation is about to happen!
      console.log(`onMutate mutation`);
      toggle();
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`error mutation`);
      notifications.show({
        title: 'Validation error',
        message: 'Please fix the errors in the form and try again.',
        color: 'red',
      });
    },
    onSuccess: (data, variables, context) => {
      console.log(`success mutation`);
      toggle();
      notifications.show({
        title: 'Form submitted',
        message: 'Your form has been submitted successfully.',
        color: theme.colors.green[6],
        position: 'bottom-right',
      });
      props.onCloseAllModals();
    },
  });

  const [initialValues, setInitialValues] = useState(
    getInitialValues({
      type: props.selectedPluginType,
      displayName: props.selectedPluginType,
      configurationSchema: props.selectedPluginConfigurationSchema,
    })
  );

  useEffect(() => {
    setInitialValues(
      getInitialValues({
        type: props.selectedPluginType,
        displayName: props.selectedPluginType,
        configurationSchema: props.selectedPluginConfigurationSchema,
      })
    );
  }, [props.selectedPluginType, props.selectedPluginConfigurationSchema]);
  const form = useForm({
    initialValues,
    validate: (values) => validateForm(values),
  });

  const handleClose = () => {
    form.reset();
    props.onClose();
  };

  return (
    <Modal.Root
      onClose={handleClose}
      opened={props.opened}
      size="95%"
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
            onSubmit={form.onSubmit(
              (values, event) => {
                console.log(
                  values, // <- form.getValues() at the moment of submit
                  event // <- form element submit event
                );
                mutation.mutate({
                  type: values.type,
                  displayName: values.displayName,
                  configurationSchema: values.configuration,
                });
              },
              (validationErrors, values, event) => {
                form.validate();
                console.log(
                  'failed',
                  validationErrors, // <- form.errors at the moment of submit
                  values, // <- form.getValues() at the moment of submit
                  event // <- form element submit event
                );
              }
            )}
          >
            <Flex direction={'column'} gap={10}>
              <LoadingOverlay
                visible={loadingOverlayVisible}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
              />
              <TextInput
                {...form.getInputProps('displayName')}
                key={form.key('displayName')}
                label="Name"
                placeholder="Plugin name"
                description="custom plugin Name"
                inputWrapperOrder={['label', 'error', 'input', 'description']}
                withAsterisk
              />
              {getFromInitialValuesTest(
                props.selectedPluginConfigurationSchema
              ).map(({ key, path, field }) =>
                renderPluginField({
                  field: field,
                  path: path,
                  pluginKey: key,
                  form: form,
                })
              )}
              {renderSpacing(6)}
            </Flex>

            <Flex
              className={classes.modalFooter}
              mih={50}
              gap="xs"
              justify="flex-end"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Button onClick={handleClose} variant={'outline'}>
                {t('plugins.modal.plugin-configuration.back')}
              </Button>
              <Button type="submit" disabled={false}>
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
