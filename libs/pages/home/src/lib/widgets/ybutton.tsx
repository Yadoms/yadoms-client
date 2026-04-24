import { Component } from 'react';
import {
  YadomsConnectionContext,
  Acquisition,
  AcquisitionListener,
} from '@yadoms/shared';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mantine/core';
import { WidgetProps, Widget } from './Widget';
import { keywordsApi } from '@yadoms/domain/keywords';
import { widgetsApi } from '@yadoms/domain/widgets';
import { connect } from 'react-redux';

export interface ButtonProps extends WidgetProps {
  inverted?: boolean; //TODO à appliquer
  size?: 'small' | 'wide';
}

interface ButtonState {
  selectedKeyword?: number | null;
  isPressed: boolean;
}

interface ButtonConfiguration {
  device: {
    deviceId: number;
    keywordId: number;
  };
  askConfirmation?: boolean;
  invert: boolean;
  kind: {
    activeSection: 'toggle' | 'pushButton';
    content: {
      toggle?: {
        radio: boolean;
      };
      pushButton?: {
        content: {
          icon: string; //TODO à gérer
        };
        radio: boolean;
      };
    };
  };
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
    console.log('yButton creation #' + props.id);

    this.state = {
      selectedKeyword: null,
      isPressed: false,
    };

    this.acquisitionListener = new ButtonStateAcquisitionListener(
      this.onNewAcquisition.bind(this)
    );

    this.onNewAcquisition = this.onNewAcquisition.bind(this);
    this.applyKeywordsToListen = this.applyKeywordsToListen.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSettingsChanged = this.handleSettingsChanged.bind(this);
    this.handleKeywordSelected = this.handleKeywordSelected.bind(this);
  }

  async componentDidMount() {
    try {
      const configuration =
        await widgetsApi.getWidgetConfiguration<ButtonConfiguration>(
          this.props.id
        );
      const keywordId = configuration.device.keywordId;
      const lastState =
        ((await keywordsApi.getLatestAcquisition(keywordId))
          ?.value as number) === 1;
      console.debug(
        'yButton configuration for widget #' + this.props.id,
        configuration
      );
      console.debug(
        'yButton acquisitions for widget #' + this.props.id,
        lastState
      );

      this.setState({
        selectedKeyword: keywordId,
        isPressed: lastState || false,
      });
    } catch (error) {
      console.error('Failed to load configuration:', error);
      // Handle error, e.g., set default state or show error UI
    }

    this.applyKeywordsToListen();
  }

  private onNewAcquisition(newAcquisition: Acquisition) {
    this.setState({
      isPressed: parseInt(newAcquisition.value) !== 0,
    });
  }

  private applyKeywordsToListen() {
    if (!this.state.selectedKeyword) return;
    this.context?.subscribeToKeywordAcquisitions(
      [this.state.selectedKeyword],
      this.acquisitionListener
    );
  }

  private handleSettingsChanged() {
    // Placeholder for external setting hook.
    console.log('YButton settings button clicked');
  }

  private handleKeywordSelected(keyword: number | null) {
    this.setState({ selectedKeyword: keyword }, () => {
      this.applyKeywordsToListen();
    });
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
      <Widget
        id={this.props.id}
        onSettingsChanged={this.handleSettingsChanged}
        onKeywordSelected={this.handleKeywordSelected}
        size={this.props.size ?? 'small'}
      >
        <div style={{ margin: '10px', height: '100%', width: '100%' }}>
          <h2>
            Button #{this.props.id}{' '}
            {this.state.selectedKeyword
              ? `on keyword #${this.state.selectedKeyword}`
              : ''}
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
