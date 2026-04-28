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

interface ButtonState {
  isPressed: boolean;
}

interface ButtonConfiguration {
  keywordId: number;
  askConfirmation?: boolean; //TODO à gérer
  invert: boolean;
  kind: {
    activeSection: 'toggle' | 'pushButton'; //TODO à gérer
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

// Renommer YButton en switch ? (pour être cohérent avec le type de widget connu du serveur)
class YButton extends Component<WidgetProps, ButtonState> {
  static contextType = YadomsConnectionContext;
  context!: React.ContextType<typeof YadomsConnectionContext>;

  acquisitionListener: ButtonStateAcquisitionListener;
  configuration?: ButtonConfiguration;

  constructor(props: WidgetProps) {
    super(props);
    console.log('yButton creation #' + props.id);

    this.state = {
      isPressed: false,
    };

    this.acquisitionListener = new ButtonStateAcquisitionListener(
      this.onNewAcquisition.bind(this)
    );

    this.onNewAcquisition = this.onNewAcquisition.bind(this);
    this.applyKeywordsToListen = this.applyKeywordsToListen.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSettingsChanged = this.handleSettingsChanged.bind(this);
  }

  async componentDidMount() {
    try {
      this.configuration =
        await widgetsApi.getWidgetConfiguration<ButtonConfiguration>(
          this.props.id
        );
      const keywordId = this.configuration.keywordId;
      const lastState =
        ((await keywordsApi.getLatestAcquisition(keywordId))
          ?.value as number) === 1;
      console.debug(
        'yButton configuration for widget #' + this.props.id,
        this.configuration
      );
      console.debug(
        'yButton acquisitions for widget #' + this.props.id,
        lastState
      );

      this.setState({
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
    if (!this.configuration?.keywordId) return;
    this.context?.subscribeToKeywordAcquisitions(
      [this.configuration.keywordId],
      this.acquisitionListener
    );
  }

  private handleSettingsChanged() {
    // Placeholder for external setting hook.
    console.log('YButton settings button clicked');
  }

  private onClick() {
    console.log('Button clicked !');

    const localIsPressed = !this.state.isPressed;

    this.setState({
      isPressed: localIsPressed,
    });

    if (this.configuration?.keywordId) {
      keywordsApi.sendCommand(
        this.configuration.keywordId,
        localIsPressed ? '1' : '0'
      );
    }
  }
  render() {
    return (
      <Widget
        id={this.props.id}
        onSettingsChanged={this.handleSettingsChanged}
        size={this.props.size ?? 'small'}
      >
        <div style={{ margin: '10px', height: '100%', width: '100%' }}>
          <h2>
            Button #{this.props.id}{' '}
            {this.configuration
              ? `on keyword #${this.configuration.keywordId}`
              : ''}
          </h2>
          <Button
            onClick={this.onClick}
            className={`toggle-button ${
              this.configuration?.invert
                ? this.state.isPressed
                  ? 'off'
                  : 'on'
                : this.state.isPressed
                ? 'on'
                : 'off'
            }`}
          >
            Click on Me !{' '}
            {this.configuration?.invert
              ? this.state.isPressed
                ? 'OFF'
                : 'ON'
              : this.state.isPressed
              ? 'ON'
              : 'OFF'}
          </Button>
        </div>
      </Widget>
    );
  }
}

const connector = connect();
export default connector(YButton);
