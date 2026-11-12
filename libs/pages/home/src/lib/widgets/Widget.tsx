import React, { Component } from 'react';
import { IconSettings, IconPlus, IconTrash } from '@tabler/icons-react';
import classes from '../home.module.css';
import classNames from 'classnames';
import {
  Modal,
  Select,
  Button,
  ActionIcon,
  Group,
  Input,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import {
  devicesApi,
  formatKeywordLabel,
  keywordsApi,
} from '@yadoms/domain/keywords';

export interface WidgetProps {
  id: number;
  title?: string;
  defaultTitle?: string;
  keywordId?: number;
  keywordIds?: number[];
  keywordCapacities?: string[];
  onSettingsChanged?: (
    keywordIds: number[],
    title: string
  ) => Promise<void> | void;
  onSettingsClick?: () => void;
  children?: React.ReactNode;
  size?: 'small' | 'wide';
}

type SettingsButtonProps = {
  onClick?: () => void;
  title?: string; //TODO utile ? A traduire si oui.
  size?: number;
  className?: string;
};

/**
 * Reusable Settings Button component using Tabler icon
 */
export function SettingsButton({
  onClick,
  title = 'Paramètres',
  size = 20,
  className = '',
}: SettingsButtonProps) {
  return (
    <button
      aria-label={title}
      title={title}
      onClick={onClick}
      style={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
        background: 'transparent',
        border: 'none',
      }}
    >
      <IconSettings size={size} stroke={2} />
    </button>
  );
}

interface WidgetState {
  settingsModalOpen: boolean;
  title: string;
  selectedKeywords: (number | null)[];
  keywordsOptions: { value: string; label: string }[];
  saving: boolean;
  saveError: string | null;
}

export class Widget extends Component<WidgetProps, WidgetState> {
  constructor(props: WidgetProps) {
    super(props);

    this.state = {
      settingsModalOpen: false,
      title: '',
      selectedKeywords: [null],
      keywordsOptions: [],
      saving: false,
      saveError: null,
    };

    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.addKeyword = this.addKeyword.bind(this);
    this.removeKeyword = this.removeKeyword.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  private get isMultiKeywords() {
    return this.props.keywordIds !== undefined;
  }

  private initialKeywords(): (number | null)[] {
    if (this.isMultiKeywords) {
      return this.props.keywordIds?.length
        ? [...this.props.keywordIds]
        : [null];
    }
    return [this.props.keywordId ?? null];
  }

  private async loadKeywords() {
    try {
      const [res, deviceNames] = await Promise.all([
        keywordsApi.loadKeywords(
          undefined,
          undefined,
          this.props.keywordCapacities
        ),
        devicesApi.getFriendlyNames(),
      ]);
      const options = res.keywords
        .map((k) => ({
          value: String(k.id),
          label: formatKeywordLabel(k, deviceNames.get(k.deviceId)),
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
      this.setState({ keywordsOptions: options });
    } catch (err) {
      console.error('Failed to load keywords for selection', err);
    }
  }

  private async handleSettingsClick() {
    this.setState({
      settingsModalOpen: true,
      title: this.props.title ?? '',
      selectedKeywords: this.initialKeywords(),
      saveError: null,
    });
    if (this.state.keywordsOptions.length === 0) {
      await this.loadKeywords();
    }

    this.props.onSettingsClick?.();
  }

  private closeModal() {
    this.setState({ settingsModalOpen: false });
  }

  handleKeywordChange(index: number, value: string | null) {
    this.setState((prevState) => ({
      selectedKeywords: prevState.selectedKeywords.map((kw, i) =>
        i === index ? (value ? parseInt(value, 10) : null) : kw
      ),
    }));
  }

  private addKeyword() {
    this.setState((prevState) => ({
      selectedKeywords: [...prevState.selectedKeywords, null],
    }));
  }

  private removeKeyword(index: number) {
    this.setState((prevState) =>
      prevState.selectedKeywords.length <= 1
        ? null
        : {
            selectedKeywords: prevState.selectedKeywords.filter(
              (_, i) => i !== index
            ),
          }
    );
  }

  private optionsFor(index: number) {
    const usedElsewhere = new Set(
      this.state.selectedKeywords
        .filter((kw, i) => i !== index && kw !== null)
        .map(String)
    );
    return this.state.keywordsOptions.filter(
      (option) => !usedElsewhere.has(option.value)
    );
  }

  private async saveSettings() {
    const keywordIds = this.state.selectedKeywords.filter(
      (kw): kw is number => kw !== null
    );
    if (keywordIds.length === 0) return;

    this.setState({ saving: true, saveError: null });
    try {
      await this.props.onSettingsChanged?.(keywordIds, this.state.title.trim());
      this.setState({ saving: false, settingsModalOpen: false });
    } catch (err) {
      console.error('Failed to save widget settings', err);
      this.setState({
        saving: false,
        saveError: 'Failed to save settings',
      });
    }
  }

  render() {
    const sizeClass = this.props.size === 'wide' ? classes.wide : classes.small;
    const { selectedKeywords } = this.state;
    const canRemove = selectedKeywords.length > 1;
    const hasSelectedKeyword = selectedKeywords.some((kw) => kw !== null);

    return (
      <div className={classNames(classes.card, sizeClass)}>
        <div className="relative" style={{ position: 'relative' }}>
          <Modal
            opened={this.state.settingsModalOpen}
            onClose={this.closeModal}
            title="Widget settings"
          >
            <Stack gap="xs">
              <TextInput
                label="Title"
                value={this.state.title}
                onChange={(event) =>
                  this.setState({ title: event.currentTarget.value })
                }
                placeholder={this.props.defaultTitle}
              />
              <Input.Label>
                {this.isMultiKeywords ? 'Equipements' : 'Equipement'}
              </Input.Label>
              {selectedKeywords.map((keyword, index) => (
                <Group key={index} gap="xs" wrap="nowrap">
                  <Select
                    style={{ flex: 1 }}
                    data={this.optionsFor(index)}
                    value={keyword !== null ? String(keyword) : null}
                    onChange={(val) => this.handleKeywordChange(index, val)}
                    placeholder="Choose a keyword"
                    searchable
                  />
                  {this.isMultiKeywords && (
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      aria-label="Remove keyword"
                      title="Remove keyword"
                      disabled={!canRemove}
                      onClick={() => this.removeKeyword(index)}
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  )}
                </Group>
              ))}
              {this.isMultiKeywords && (
                <Button
                  variant="light"
                  leftSection={<IconPlus size={16} />}
                  onClick={this.addKeyword}
                >
                  Add keyword
                </Button>
              )}
            </Stack>
            {this.state.saveError && (
              <Text c="red" size="sm" mt="sm">
                {this.state.saveError}
              </Text>
            )}
            <div style={{ marginTop: 12 }}>
              <Button
                onClick={this.saveSettings}
                disabled={!hasSelectedKeyword}
                loading={this.state.saving}
              >
                Save
              </Button>
            </div>
          </Modal>
          <SettingsButton onClick={this.handleSettingsClick} />
        </div>
        {this.props.children}
      </div>
    );
  }
}
