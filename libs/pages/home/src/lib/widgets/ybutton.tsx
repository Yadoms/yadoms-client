import { Component } from 'react';
import {
  YadomsConnectionContext,
  Acquisition,
  AcquisitionListener,
} from '@yadoms/shared';
import { v4 as uuidv4 } from 'uuid';
import { Button, Modal, Select } from '@mantine/core';
import { WidgetProps, Widget } from './Widget';
import { keywordsApi } from '@yadoms/domain/keywords';
import { connect } from 'react-redux';

export interface ButtonProps extends WidgetProps {
  inverted?: boolean; //TODO à appliquer
}

interface ButtonState {
  myAcquisitions: Acquisition[]; //TODO conserver ?
  selectedKeyword?: number | null;
  settingsModalOpen: boolean;
  keywordsOptions: { value: string; label: string }[];
  isPressed: boolean;
}

class ButtonStateAcquisitionListener implements AcquisitionListener {
  constructor(onNewAcquisition: (newAcquisition: Acquisition) => void) {
    this.uuid = uuidv4();
    this.onNewAcquisition = onNewAcquisition;
  }
  uuid: string;
  onReceived(newAcquisition: Acquisition): void {
    this.onNewAcquisition(newAcquisition);
  }
  private onNewAcquisition: (newAcquisition: Acquisition) => void;
}

class YButton extends Component<ButtonProps, ButtonState> {
  static contextType = YadomsConnectionContext;
  context!: React.ContextType<typeof YadomsConnectionContext>;

  acquisitionListener: ButtonStateAcquisitionListener;

  constructor(props: ButtonProps) {
    super(props);
    console.log('yButton creation #' + props.widgetId);

    this.state = {
      myAcquisitions: [],
      selectedKeyword: null,
      settingsModalOpen: false,
      keywordsOptions: [],
      isPressed: false,
    };

    this.acquisitionListener = new ButtonStateAcquisitionListener(
      this.onNewAcquisition.bind(this)
    );

    this.onNewAcquisition = this.onNewAcquisition.bind(this);
    this.applyKeywordsToListen = this.applyKeywordsToListen.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.loadKeywords = this.loadKeywords.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  componentDidMount() {
    this.applyKeywordsToListen();
  }

  private onNewAcquisition(newAcquisition: Acquisition) {
    this.setState({
      isPressed: parseInt(newAcquisition.value) !== 0 ? true : false,
    });
  }

  private applyKeywordsToListen() {
    if (!this.state.selectedKeyword) 
      return;
    this.context?.subscribeToKeywordAcquisitions(
      [this.state.selectedKeyword],
      this.acquisitionListener
    );
  }

  private handleSettingsClick() {
    // Open settings modal to choose keyword
    this.setState({ settingsModalOpen: true });
    if (this.state.keywordsOptions.length === 0) {
      this.loadKeywords();
    }
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

  private saveSettings() {
    this.setState({ settingsModalOpen: false });
    // re-subscribe with new selection
    this.applyKeywordsToListen();
  }

  private onClick() {
    console.log('Button clicked !');

    const localIsPressed = !this.state.isPressed;

    this.setState({
      isPressed: localIsPressed,
    });

    if (!this.state.selectedKeyword) {
      console.warn('No keyword selected for this widget');
      return;
    }
    keywordsApi.sendCommand(
      this.state.selectedKeyword,
      localIsPressed ? '1' : '0'
    );
  }
  render() {
    return (
      <Widget widgetId={this.props.widgetId} onSettingsClick={this.handleSettingsClick}>
        <div style={{ margin: '10px', height: '100%', width: '100%' }}>

          <Modal
            opened={this.state.settingsModalOpen}
            onClose={() => this.setState({ settingsModalOpen: false })}
            title="Select keyword"
          >
            <Select
              data={this.state.keywordsOptions}
              value={this.state.selectedKeyword ? String(this.state.selectedKeyword) : undefined}
              onChange={(val) => this.setState({ selectedKeyword: val ? parseInt(val, 10) : null })}
              placeholder="Choose a keyword"
              searchable
            />
            <div style={{ marginTop: 12 }}>
              <Button onClick={() => this.saveSettings()}>Save</Button>
            </div>
          </Modal>

          <h2>
            Button #{this.props.widgetId} {this.state.selectedKeyword ? `on keyword #${this.state.selectedKeyword}` : ''}
          </h2>
          <Button
            onClick={this.onClick}
            className={`toggle-button ${this.state.isPressed ? 'on' : 'off'}`}
          >
            Click on Me ! {this.state.isPressed ? 'ON' : 'OFF'}
          </Button>
        </div>
      </Widget>
    );
  }
}

const connector = connect();
export default connector(YButton);
