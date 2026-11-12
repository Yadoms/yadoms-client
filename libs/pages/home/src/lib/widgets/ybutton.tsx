import { Component } from 'react';
import {
  YadomsConnectionContext,
  Acquisition,
  AcquisitionListener,
} from '@yadoms/shared';
import { v4 as uuidv4 } from 'uuid';
import { Button, Group, Switch, Text } from '@mantine/core';
import { getI18n } from 'react-i18next';
import { WidgetProps, Widget } from './Widget';
import {
  devicesApi,
  formatKeywordLabel,
  keywordsApi,
} from '@yadoms/domain/keywords';
import { widgetsApi } from '@yadoms/domain/widgets';
import { connect } from 'react-redux';

const SENT_MESSAGE_DURATION_MS = 2000;

interface ButtonState {
  isPressed: boolean;
  title: string;
  keywordLabel?: string;
  keywordCapacityName?: string;
  showSentMessage: boolean;
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
  private sentMessageTimeout?: ReturnType<typeof setTimeout>;

  constructor(props: WidgetProps) {
    super(props);
    console.log('yButton creation #' + props.id);

    this.state = {
      isPressed: false,
      title: '',
      showSentMessage: false,
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
      const widget = await widgetsApi.getWidget<ButtonConfiguration>(
        this.props.id
      );
      this.configuration = widget.configuration;
      console.debug(
        'yButton configuration for widget #' + this.props.id,
        this.configuration
      );
      this.setState({ title: widget.title });
      await Promise.all([this.loadKeyword(), this.loadLastState()]);
    } catch (error) {
      console.error('Failed to load configuration:', error);
      // Handle error, e.g., set default state or show error UI
    }

    this.applyKeywordsToListen();
  }

  componentWillUnmount() {
    clearTimeout(this.sentMessageTimeout);
  }

  private async loadLastState() {
    if (!this.configuration) return;
    const lastState =
      ((await keywordsApi.getLatestAcquisition(this.configuration.keywordId))
        ?.value as number) === 1;
    console.debug(
      'yButton acquisitions for widget #' + this.props.id,
      lastState
    );

    this.setState({
      isPressed: lastState || false,
    });
  }

  private async loadKeyword() {
    if (!this.configuration?.keywordId) return;
    try {
      const [keyword] = await keywordsApi.getKeywords([
        this.configuration.keywordId,
      ]);
      if (!keyword) return;
      const deviceFriendlyName = await devicesApi.getFriendlyName(
        keyword.deviceId
      );
      this.setState({
        keywordLabel: formatKeywordLabel(keyword, deviceFriendlyName),
        keywordCapacityName: keyword.capacityName,
      });
    } catch (error) {
      console.error('Failed to load keyword:', error);
    }
  }

  private get isPushButton() {
    return this.state.keywordCapacityName === 'event';
  }

  private get displayedTitle() {
    return (
      this.state.title || this.state.keywordLabel || `Button #${this.props.id}`
    );
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

  private async handleSettingsChanged(keywordIds: number[], title: string) {
    if (!this.configuration)
      throw new Error('Widget configuration is not loaded');

    const newConfiguration: ButtonConfiguration = {
      ...this.configuration,
      keywordId: keywordIds[0],
    };
    await widgetsApi.updateWidget(this.props.id, {
      title,
      configuration: newConfiguration,
    });
    this.configuration = newConfiguration;
    this.setState({
      title,
      keywordLabel: undefined,
      keywordCapacityName: undefined,
    });

    this.applyKeywordsToListen();
    await this.loadKeyword();
    try {
      await this.loadLastState();
    } catch (error) {
      console.error('Failed to load last state:', error);
      this.forceUpdate();
    }
  }

  private onClick() {
    if (this.isPushButton) {
      this.push();
    } else {
      this.toggle();
    }
  }

  private toggle() {
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

  private async push() {
    if (!this.configuration?.keywordId) return;

    try {
      await keywordsApi.sendCommand(this.configuration.keywordId, '1');
    } catch (error) {
      console.error('Failed to send event command:', error);
      return;
    }

    clearTimeout(this.sentMessageTimeout);
    this.setState({ showSentMessage: true });
    this.sentMessageTimeout = setTimeout(
      () => this.setState({ showSentMessage: false }),
      SENT_MESSAGE_DURATION_MS
    );
  }

  private get isOn() {
    return this.configuration?.invert
      ? !this.state.isPressed
      : this.state.isPressed;
  }

  private renderToggle() {
    return (
      <Switch
        size="xl"
        onLabel="ON"
        offLabel="OFF"
        checked={this.isOn}
        onChange={this.onClick}
      />
    );
  }

  private renderPushButton() {
    return (
      <Group gap="sm" wrap="nowrap">
        <Button onClick={this.onClick}>
          {getI18n()?.t('widgets.button.push') ?? 'Envoyer'}
        </Button>
        {this.state.showSentMessage && (
          <Text c="green" size="sm">
            {getI18n()?.t('widgets.button.sent') ?? 'Envoyé !'}
          </Text>
        )}
      </Group>
    );
  }

  render() {
    return (
      <Widget
        id={this.props.id}
        title={this.state.title}
        defaultTitle={this.state.keywordLabel}
        keywordId={this.configuration?.keywordId}
        keywordCapacities={['switch', 'event']}
        onSettingsChanged={this.handleSettingsChanged}
        size={this.props.size ?? 'small'}
      >
        <div style={{ margin: '10px', height: '100%', width: '100%' }}>
          <h2>{this.displayedTitle}</h2>
          {this.isPushButton ? this.renderPushButton() : this.renderToggle()}
        </div>
      </Widget>
    );
  }
}

const connector = connect();
export default connector(YButton);
