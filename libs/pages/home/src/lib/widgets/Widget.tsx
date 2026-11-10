import React, { Component } from 'react';
import { IconSettings, IconPlus, IconTrash } from '@tabler/icons-react';
import classes from '../home.module.css';
import classNames from 'classnames';
import { Modal, Select, Button, ActionIcon, Group, Stack } from '@mantine/core';
import { keywordsApi } from '@yadoms/domain/keywords';

export interface WidgetProps {
  id: number;
  keywordId?: number;
  keywordIds?: number[];
  onSettingsChanged?: () => void;
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
  selectedKeywords: (number | null)[];
  keywordsOptions: { value: string; label: string }[];
}

export class Widget extends Component<WidgetProps, WidgetState> {
  constructor(props: WidgetProps) {
    super(props);

    this.state = {
      settingsModalOpen: false,
      selectedKeywords: [null],
      keywordsOptions: [],
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
      const res = await keywordsApi.loadKeywords(0, 200);
      const options = res.keywords.map((k) => ({
        value: String(k.id),
        label: `${k.id} - ${k.friendlyName}`,
      }));
      this.setState({ keywordsOptions: options });
    } catch (err) {
      console.error('Failed to load keywords for selection', err);
    }
  }

  private async handleSettingsClick() {
    this.setState({
      settingsModalOpen: true,
      selectedKeywords: this.initialKeywords(),
    });
    if (this.state.keywordsOptions.length === 0) {
      await this.loadKeywords();
    }

    this.props.onSettingsClick?.();
    this.props.onSettingsChanged?.();
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

  private saveSettings() {
    this.setState({ settingsModalOpen: false });
    this.props.onSettingsChanged?.();
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
            title={this.isMultiKeywords ? 'Select keywords' : 'Select keyword'}
          >
            <Stack gap="xs">
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
            <div style={{ marginTop: 12 }}>
              <Button
                onClick={this.saveSettings}
                disabled={!hasSelectedKeyword}
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
