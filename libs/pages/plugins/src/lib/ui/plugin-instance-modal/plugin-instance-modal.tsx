import {
  ActionIcon,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { openConfirmModal } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import {
  IconDevices2,
  IconPlayerPlay,
  IconPlayerStop,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { InlineEdit, PluginIcon } from '@yadoms/shared';
import {
  AvailablePluginsEntity,
  getFromInitialValuesTest,
  PluginConfigurationSchema,
  pluginsApi,
  PluginsInstancesEntity,
  PuginsInstancesState,
} from '@yadoms/domain/plugins';
import LinkifyText from '../linkify-text/linkify-text';
import renderPluginField from '../render-plugin-field/render-plugin-field';
import { validateForm } from '../plugin-configuration-modal/plugins-configuration-forms';
import { PluginStateBadge } from '../plugins-page/plugin-state';
import classes from './plugin-instance-modal.module.css';

export interface PluginInstanceModalProps {
  instance: PluginsInstancesEntity;
  plugin?: AvailablePluginsEntity;
  onClose: () => void;
  onInstanceChanged: () => Promise<void>;
}

export function PluginInstanceModal({
  instance,
  plugin,
  onClose,
  onInstanceChanged,
}: PluginInstanceModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [startingOrStopping, setStartingOrStopping] = useState(false);
  const [savingConfiguration, setSavingConfiguration] = useState(false);

  const configuration = (instance.configuration ??
    {}) as PluginConfigurationSchema;
  const form = useForm({
    initialValues: {
      type: instance.type,
      displayName: instance.displayName,
      configuration: configuration as Record<string, unknown>,
    },
    validate: (values) => validateForm(values),
  });

  const isStopped =
    instance.state === PuginsInstancesState.Stopped ||
    instance.state === PuginsInstancesState.Error;

  const runAction = async (action: () => Promise<void>, errorKey: string) => {
    try {
      await action();
    } catch (err) {
      console.error('Plugin instance action failed', err);
      notifications.show({ color: 'red', message: t(errorKey) });
      throw err;
    } finally {
      await onInstanceChanged();
    }
  };

  const rename = async (displayName: string) => {
    if (!displayName.trim()) {
      notifications.show({
        color: 'red',
        message: t('plugins.modal.instance.emptyName'),
      });
      throw new Error('Empty plugin instance name');
    }
    await runAction(
      () => pluginsApi.savePluginsInstance(instance.id, { displayName }),
      'plugins.modal.instance.renameError'
    );
  };

  const toggleStartStop = async () => {
    setStartingOrStopping(true);
    try {
      await runAction(
        () => pluginsApi.startStopPluginsInstance(instance.id, isStopped),
        isStopped
          ? 'plugins.modal.instance.startError'
          : 'plugins.modal.instance.stopError'
      );
    } catch {
      // Error already notified
    } finally {
      setStartingOrStopping(false);
    }
  };

  const setAutoStart = (autoStart: boolean) =>
    runAction(
      () => pluginsApi.savePluginsInstance(instance.id, { autoStart }),
      'plugins.modal.instance.saveError'
    ).catch(() => undefined);

  const saveConfiguration = form.onSubmit(async (values) => {
    setSavingConfiguration(true);
    try {
      await runAction(
        () =>
          pluginsApi.savePluginsInstance(instance.id, {
            configuration: values.configuration,
          }),
        'plugins.modal.instance.saveError'
      );
      form.resetDirty();
      notifications.show({
        color: 'green',
        message: t('plugins.modal.instance.configurationSaved'),
      });
    } catch {
      // Error already notified
    } finally {
      setSavingConfiguration(false);
    }
  });

  const confirmDelete = () =>
    openConfirmModal({
      title: t('plugins.modal.instance.delete'),
      centered: true,
      children: (
        <Text size="sm">
          {t('plugins.modal.instance.confirmDelete', {
            name: instance.displayName,
          })}
        </Text>
      ),
      labels: {
        confirm: t('plugins.modal.instance.delete'),
        cancel: t('common.cancel'),
      },
      confirmProps: { color: 'red' },
      onConfirm: () =>
        void runAction(
          () => pluginsApi.deletePluginsInstance(instance.id),
          'plugins.modal.instance.deleteError'
        )
          .then(onClose)
          .catch(() => undefined),
    });

  const configurationFields = getFromInitialValuesTest(configuration);

  return (
    <Modal
      opened
      onClose={onClose}
      size="xl"
      title={
        <InlineEdit
          display={
            <Text fw={600} size="lg">
              {instance.displayName}
            </Text>
          }
          initialValue={instance.displayName}
          editLabel={t('plugins.modal.instance.rename')}
          onSave={rename}
          renderInput={(value, onChange) => (
            <TextInput
              autoFocus
              value={value}
              onChange={(event) => onChange(event.currentTarget.value)}
            />
          )}
          actions={
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              aria-label={t('plugins.modal.instance.delete')}
              title={t('plugins.modal.instance.delete')}
              onClick={confirmDelete}
            >
              <IconTrash size={16} stroke={1.5} />
            </ActionIcon>
          }
        />
      }
    >
      <Stack>
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Text size="sm" c="dimmed" className={classes.description}>
            <LinkifyText text={plugin?.description} />
          </Text>
          <Stack align="center" gap="xs">
            <PluginIcon pluginType={instance.type} size={128} />
            <Text size="sm">{plugin?.name ?? instance.type}</Text>
          </Stack>
        </Group>

        <Divider />
        <Title order={4}>{t('plugins.modal.instance.state')}</Title>
        <Group gap="xs">
          <PluginStateBadge state={instance.state} />
          {instance.fullState && (
            <Text size="sm" c="dimmed">
              {instance.fullState}
            </Text>
          )}
        </Group>
        <Group>
          <Button
            variant="light"
            color={isStopped ? 'green' : 'red'}
            loading={startingOrStopping}
            leftSection={
              isStopped ? (
                <IconPlayerPlay size={18} stroke={1.5} />
              ) : (
                <IconPlayerStop size={18} stroke={1.5} />
              )
            }
            onClick={() => void toggleStartStop()}
          >
            {t(
              isStopped
                ? 'plugins.modal.instance.start'
                : 'plugins.modal.instance.stop'
            )}
          </Button>
        </Group>

        <Checkbox
          label={t('plugins.home.start-automatically')}
          checked={instance.autoStart}
          onChange={(event) => void setAutoStart(event.currentTarget.checked)}
        />

        <Group>
          <Button
            variant="light"
            leftSection={<IconDevices2 size={18} stroke={1.5} />}
            onClick={() => navigate(`/devices?pluginInstance=${instance.id}`)}
          >
            {t('plugins.modal.instance.attachedDevices')}
          </Button>
        </Group>

        {configurationFields.length > 0 && (
          <>
            <Divider />
            <Title order={4}>{t('plugins.modal.instance.configuration')}</Title>
            <form onSubmit={saveConfiguration}>
              <Flex direction="column" gap={10}>
                {configurationFields.map(({ key, path, field }) =>
                  renderPluginField({
                    field,
                    path,
                    pluginKey: key,
                    form,
                  })
                )}
              </Flex>
              <Group justify="flex-end" mt="md">
                <Button
                  type="submit"
                  loading={savingConfiguration}
                  disabled={!form.isDirty()}
                >
                  {t('common.save')}
                </Button>
              </Group>
            </form>
          </>
        )}
      </Stack>
    </Modal>
  );
}

export default PluginInstanceModal;
