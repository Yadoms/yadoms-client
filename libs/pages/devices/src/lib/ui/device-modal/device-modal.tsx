import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Skeleton,
  Stack,
  Switch,
  Table,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconSend, IconSettings } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { YadomsConnectionContext } from '@yadoms/shared';
import {
  AccessMode,
  DeviceEntity,
  devicesApi,
  KeywordEntity,
  keywordsApi,
} from '@yadoms/domain/keywords';
import { PluginsInstancesEntity } from '@yadoms/domain/plugins';
import { InlineEdit } from '../inline-edit/inline-edit';
import { PluginIcon } from '../plugin-icon/plugin-icon';
import {
  formatElapsedTime,
  isTrueValue,
  parseAcquisitionDate,
  parseTypeInfo,
  unitSymbol,
} from './keyword-format';
import classes from './device-modal.module.css';

const DEVICE_KEYWORDS_QUERY_KEY = 'device-keywords';
const ELAPSED_TIME_REFRESH_MS = 30000;

interface LiveAcquisition {
  value: string;
  date: Date;
}

interface NumericTypeInfo {
  min: number;
  max: number;
  step: number;
  precision: number;
}

interface EnumTypeInfo {
  name: string;
  values: string[];
}

export interface DeviceModalProps {
  device: DeviceEntity;
  /** Undefined for system devices */
  pluginInstance?: PluginsInstancesEntity;
  onClose: () => void;
  onConfigure: (device: DeviceEntity) => void;
  onDeviceChanged: () => Promise<void>;
}

export function DeviceModal({
  device,
  pluginInstance,
  onClose,
  onConfigure,
  onDeviceChanged,
}: DeviceModalProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [model, setModel] = useState(device.model);

  useEffect(() => setModel(device.model), [device.model]);

  const keywordsQuery = useQuery({
    queryKey: [DEVICE_KEYWORDS_QUERY_KEY, device.id],
    queryFn: () => keywordsApi.getDeviceKeywords(device.id, []),
  });

  const liveAcquisitions = useLiveAcquisitions(keywordsQuery.data);
  const now = useNow(ELAPSED_TIME_REFRESH_MS);

  const runAction = async (action: () => Promise<void>, errorKey: string) => {
    try {
      await action();
    } catch (err) {
      console.error('Device modal action failed', err);
      notifications.show({ color: 'red', message: t(errorKey) });
      throw err;
    }
  };

  const renameDevice = async (friendlyName: string) => {
    if (!friendlyName.trim()) {
      notifications.show({
        color: 'red',
        message: t('devices.modal.emptyName'),
      });
      throw new Error('Empty device name');
    }
    await runAction(
      () => devicesApi.updateDevice(device.id, { friendlyName }),
      'devices.modal.renameError'
    );
    await onDeviceChanged();
  };

  const saveModel = async () => {
    if (model === device.model) return;
    try {
      await runAction(
        () => devicesApi.updateDevice(device.id, { model }),
        'devices.modal.saveModelError'
      );
      await onDeviceChanged();
    } catch {
      setModel(device.model);
    }
  };

  const renameKeyword = async (keyword: KeywordEntity, name: string) => {
    if (!name.trim()) {
      notifications.show({
        color: 'red',
        message: t('devices.modal.emptyName'),
      });
      throw new Error('Empty keyword name');
    }
    await runAction(
      () => keywordsApi.renameKeyword(keyword.id, name),
      'devices.modal.renameKeywordError'
    );
    await queryClient.invalidateQueries({
      queryKey: [DEVICE_KEYWORDS_QUERY_KEY, device.id],
    });
  };

  const sendCommand = (keyword: KeywordEntity, command: string) =>
    runAction(
      () => keywordsApi.sendCommand(keyword.id, command),
      'devices.modal.commandError'
    );

  return (
    <Modal
      opened
      onClose={onClose}
      size="xl"
      title={
        <InlineEdit
          display={
            <Text fw={600} size="lg">
              {device.friendlyName}
            </Text>
          }
          initialValue={device.friendlyName}
          editLabel={t('devices.modal.rename')}
          onSave={renameDevice}
          renderInput={(value, onChange) => (
            <TextInput
              autoFocus
              value={value}
              onChange={(event) => onChange(event.currentTarget.value)}
            />
          )}
        />
      }
    >
      <Stack>
        <Group gap="xs" wrap="nowrap">
          <PluginIcon instance={pluginInstance} />
          <Text size="sm">
            {t('devices.modal.attachedToPlugin', {
              plugin: pluginInstance?.displayName ?? 'System',
            })}
          </Text>
        </Group>

        <Textarea
          label={t('devices.home.model')}
          autosize
          minRows={2}
          value={model}
          onChange={(event) => setModel(event.currentTarget.value)}
          onBlur={() => void saveModel()}
        />

        <Group>
          <Button
            variant="light"
            leftSection={<IconSettings size={18} stroke={1.5} />}
            onClick={() => onConfigure(device)}
          >
            {t('devices.home.configure')}
          </Button>
        </Group>

        <Skeleton visible={keywordsQuery.isLoading}>
          {keywordsQuery.isError ? (
            <Text c="red" size="sm">
              {t('devices.modal.loadKeywordsError')}
            </Text>
          ) : (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>{t('devices.modal.keyword')}</Table.Th>
                  <Table.Th>{t('devices.modal.value')}</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {(keywordsQuery.data ?? []).map((keyword) => (
                  <KeywordRow
                    key={keyword.id}
                    keyword={keyword}
                    liveAcquisition={liveAcquisitions.get(keyword.id)}
                    now={now}
                    onRename={(name) => renameKeyword(keyword, name)}
                    onCommand={(command) => sendCommand(keyword, command)}
                  />
                ))}
              </Table.Tbody>
            </Table>
          )}
        </Skeleton>
      </Stack>
    </Modal>
  );
}

interface KeywordRowProps {
  keyword: KeywordEntity;
  liveAcquisition?: LiveAcquisition;
  now: number;
  onRename: (name: string) => Promise<void>;
  onCommand: (command: string) => Promise<void>;
}

function KeywordRow({
  keyword,
  liveAcquisition,
  now,
  onRename,
  onCommand,
}: KeywordRowProps) {
  const { t, i18n } = useTranslation();

  const value = liveAcquisition?.value ?? keyword.lastAcquisitionValue ?? '';
  const date =
    liveAcquisition?.date ?? parseAcquisitionDate(keyword.lastAcquisitionDate);
  const hasValue = date !== undefined;
  const editable = keyword.accessMode === AccessMode.GetSet;

  const displayedValue = !hasValue
    ? '-'
    : keyword.type === 'Bool'
    ? t(isTrueValue(value) ? 'devices.modal.on' : 'devices.modal.off')
    : [value, unitSymbol(keyword.units)].filter(Boolean).join(' ');

  const valueText = (
    <Text size="sm" className={classes.value}>
      {displayedValue}
    </Text>
  );

  const renderValue = () => {
    if (!editable) return valueText;
    if (keyword.type === 'NoData') {
      return (
        <Button
          size="compact-sm"
          variant="light"
          leftSection={<IconSend size={14} stroke={1.5} />}
          onClick={() => void onCommand('').catch(() => undefined)}
        >
          {t('devices.modal.send')}
        </Button>
      );
    }
    if (keyword.type === 'Bool') {
      return <BoolSwitch value={value} onCommand={onCommand} />;
    }
    return (
      <InlineEdit
        display={valueText}
        initialValue={value}
        editLabel={t('devices.modal.editValue')}
        saveUnchanged
        onSave={onCommand}
        renderInput={(editedValue, onChange) => (
          <KeywordValueInput
            keyword={keyword}
            value={editedValue}
            onChange={onChange}
          />
        )}
      />
    );
  };

  return (
    <Table.Tr>
      <Table.Td>
        <InlineEdit
          display={<Text size="sm">{keyword.friendlyName}</Text>}
          initialValue={keyword.friendlyName}
          editLabel={t('devices.modal.rename')}
          onSave={onRename}
          renderInput={(name, onChange) => (
            <TextInput
              size="xs"
              autoFocus
              value={name}
              onChange={(event) => onChange(event.currentTarget.value)}
            />
          )}
        />
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          {renderValue()}
          {date && (
            <Text size="xs" c="dimmed">
              {formatElapsedTime(date, now, i18n.language)} (
              {date.toLocaleString(i18n.language)})
            </Text>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}

function BoolSwitch({
  value,
  onCommand,
}: {
  value: string;
  onCommand: (command: string) => Promise<void>;
}) {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(isTrueValue(value));
  const [sending, setSending] = useState(false);

  useEffect(() => setChecked(isTrueValue(value)), [value]);

  const toggle = async (newChecked: boolean) => {
    setChecked(newChecked);
    setSending(true);
    try {
      await onCommand(newChecked ? '1' : '0');
    } catch {
      setChecked(!newChecked);
    } finally {
      setSending(false);
    }
  };

  return (
    <Switch
      size="md"
      onLabel={t('devices.modal.on')}
      offLabel={t('devices.modal.off')}
      checked={checked}
      disabled={sending}
      onChange={(event) => void toggle(event.currentTarget.checked)}
    />
  );
}

function KeywordValueInput({
  keyword,
  value,
  onChange,
}: {
  keyword: KeywordEntity;
  value: string;
  onChange: (value: string) => void;
}) {
  switch (keyword.type) {
    case 'Enum': {
      const { values } = parseTypeInfo<EnumTypeInfo>(keyword.typeInfo);
      return (
        <Select
          size="xs"
          autoFocus
          data={Array.isArray(values) ? values : []}
          value={value || null}
          onChange={(selected) => onChange(selected ?? '')}
        />
      );
    }
    case 'Numeric': {
      const typeInfo = parseTypeInfo<NumericTypeInfo>(keyword.typeInfo);
      return (
        <NumberInput
          size="xs"
          autoFocus
          value={value}
          min={typeInfo.min}
          max={typeInfo.max}
          step={typeInfo.step}
          decimalScale={typeInfo.precision}
          onChange={(number) => onChange(String(number))}
        />
      );
    }
    default:
      return (
        <TextInput
          size="xs"
          autoFocus
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
        />
      );
  }
}

function useLiveAcquisitions(keywords: KeywordEntity[] | undefined) {
  const connection = useContext(YadomsConnectionContext);
  // The context value changes on every server time tick, avoid resubscribing
  const connectionRef = useRef(connection);
  connectionRef.current = connection;
  const listenerUuid = useMemo(() => uuidv4(), []);
  const [acquisitions, setAcquisitions] = useState(
    new Map<number, LiveAcquisition>()
  );

  const keywordIdsKey = (keywords ?? []).map((keyword) => keyword.id).join('|');

  useEffect(() => {
    const keywordIds = keywordIdsKey
      ? keywordIdsKey.split('|').map(Number)
      : [];
    connectionRef.current?.subscribeToKeywordAcquisitions(keywordIds, {
      uuid: listenerUuid,
      onReceived: (acquisition) =>
        setAcquisitions((previous) =>
          new Map(previous).set(acquisition.keyword, {
            value: acquisition.value,
            date: acquisition.date,
          })
        ),
    });
    return () =>
      connectionRef.current?.subscribeToKeywordAcquisitions([], {
        uuid: listenerUuid,
        onReceived: () => undefined,
      });
  }, [keywordIdsKey, listenerUuid]);

  return acquisitions;
}

function useNow(refreshMs: number) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), refreshMs);
    return () => clearInterval(timer);
  }, [refreshMs]);
  return now;
}

export default DeviceModal;
