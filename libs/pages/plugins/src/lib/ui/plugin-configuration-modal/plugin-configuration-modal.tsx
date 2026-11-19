import {
  Button,
  Divider,
  Flex,
  Modal,
  ScrollArea,
  Space,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validateForm } from './plugins-configuration-forms';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import renderPluginField from '../render-plugin-field/render-plugin-field';
import {
  AvailablePluginsEntity,
  getFromInitialValuesTest,
  getInitialValues,
  pluginsApi,
} from '@yadoms/domain/plugins';
import classes from './plugin-configuration-modal.module.css';

export interface PluginConfigurationModalProps {
  opened: boolean;
  onClose: () => void;
  plugin: AvailablePluginsEntity;
  onPluginCreated: () => void;
}

export interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label?: string;
  value: string;
  description?: string;
}

export function PluginConfigurationModal({
  opened,
  onClose,
  plugin,
  onPluginCreated,
}: PluginConfigurationModalProps) {
  const { t } = useTranslation();
  const [creating, setCreating] = useState(false);

  const configurationSchema = plugin.configuration ?? {};
  const pluginName = plugin.name || plugin.type;

  const form = useForm({
    initialValues: getInitialValues({
      type: plugin.type,
      displayName: pluginName,
      configurationSchema,
    }),
    validate: (values) => {
      const errors = validateForm(values);
      if (!values.displayName.trim()) {
        errors['displayName'] = t('plugins.modal.instance.emptyName');
      }
      return errors;
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const createPlugin = form.onSubmit(
    async (values) => {
      setCreating(true);
      try {
        await pluginsApi.createPluginsInstance(
          values.type,
          values.displayName.trim(),
          values.configuration
        );
        notifications.show({
          color: 'green',
          message: t('plugins.modal.plugin-configuration.created', {
            name: values.displayName.trim(),
          }),
        });
        onPluginCreated();
      } catch (err) {
        console.error('Plugin instance creation failed', err);
        notifications.show({
          color: 'red',
          message: t('plugins.modal.plugin-configuration.createError'),
        });
      } finally {
        setCreating(false);
      }
    },
    () =>
      notifications.show({
        color: 'red',
        message: t('plugins.modal.plugin-configuration.validationError'),
      })
  );

  const configurationFields = getFromInitialValuesTest(configurationSchema);

  return (
    <Modal.Root
      onClose={handleClose}
      opened={opened}
      size="95%"
      zIndex={1000}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Modal.Overlay opacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            {t('plugins.modal.plugin-configuration.title', {
              name: pluginName,
            })}
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={createPlugin}>
            <Flex direction={'column'} gap={10}>
              <TextInput
                label={t('plugins.modal.plugin-configuration.name')}
                description={t(
                  'plugins.modal.plugin-configuration.name-description'
                )}
                inputWrapperOrder={['label', 'error', 'input', 'description']}
                withAsterisk
                data-autofocus
                {...form.getInputProps('displayName')}
              />
              {configurationFields.length > 0 && (
                <>
                  <Divider mt="md" />
                  <Title order={4}>
                    {t('plugins.modal.plugin-configuration.configuration')}
                  </Title>
                  {configurationFields.map(({ key, path, field }) =>
                    renderPluginField({
                      field,
                      path,
                      pluginKey: key,
                      form,
                    })
                  )}
                </>
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
              <Button type="submit" loading={creating}>
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
