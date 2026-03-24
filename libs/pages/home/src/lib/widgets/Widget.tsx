import React, { Component } from 'react';
import { IconSettings } from '@tabler/icons-react';
import classes from '../home.module.css';
import classNames from 'classnames';
import { Modal, Select, Button } from '@mantine/core';
import { keywordsApi } from '@yadoms/domain/keywords';

export interface WidgetProps {
  id: number;
  onSettingsChanged?: () => void;
  onSettingsClick?: () => void;
  onKeywordSelected?: (keywordId: number | null) => void;
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
        zIndex: 9999,
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
  selectedKeyword: number | null;
  keywordsOptions: { value: string; label: string }[];
}

export class Widget extends Component<WidgetProps, WidgetState> {
  constructor(props: WidgetProps) {
    super(props);

    this.state = {
      settingsModalOpen: false,
      selectedKeyword: null,
      keywordsOptions: [],
    };

    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
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
    this.setState({ settingsModalOpen: true });
    if (this.state.keywordsOptions.length === 0) {
      await this.loadKeywords();
    }

    this.props.onSettingsClick?.();
    this.props.onSettingsChanged?.();
  }

  private closeModal() {
    this.setState({ settingsModalOpen: false });
  }

  handleKeywordChange(value: string | null) {
    this.setState({ selectedKeyword: value ? parseInt(value, 10) : null });
  }

  private saveSettings() {
    this.setState({ settingsModalOpen: false });

    if (this.props.onKeywordSelected) {
      this.props.onKeywordSelected(this.state.selectedKeyword);
    }
    this.props.onSettingsChanged?.();
  }

  render() {
    const sizeClass = this.props.size === 'wide' ? classes.wide : classes.small;

    return (
      <div className={classNames(classes.card, sizeClass)}>
        <div className="relative" style={{ position: 'relative' }}>
          <Modal
            opened={this.state.settingsModalOpen}
            onClose={this.closeModal}
            title="Select keyword"
          >
            <Select
              data={this.state.keywordsOptions}
              value={
                this.state.selectedKeyword
                  ? String(this.state.selectedKeyword)
                  : undefined
              }
              onChange={(val) => this.handleKeywordChange(val)}
              placeholder="Choose a keyword"
              searchable
            />
            <div style={{ marginTop: 12 }}>
              <Button onClick={this.saveSettings}>Save</Button>
            </div>
          </Modal>
          <SettingsButton onClick={this.handleSettingsClick} />
        </div>
        {this.props.children}
      </div>
    );
  }
}
