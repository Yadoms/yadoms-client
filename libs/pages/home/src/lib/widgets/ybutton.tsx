import { Component } from 'react';
import {
  YadomsConnectionContext,
  Acquisition,
  AcquisitionListener,
} from '@yadoms/shared';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mantine/core';
import { WidgetProps } from './Widget';
import { keywordsApi } from '@yadoms/domain/keywords';
import { connect } from 'react-redux';

export interface ButtonProps extends WidgetProps {
  buttonKeyword: number;
}

interface ButtonState {
  myAcquisitions: Acquisition[]; //TODO conserver ?
  buttonKeyword: number;
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
      buttonKeyword: props.buttonKeyword,
      isPressed: false,
    };

    this.acquisitionListener = new ButtonStateAcquisitionListener(
      this.onNewAcquisition.bind(this)
    );

    this.onNewAcquisition = this.onNewAcquisition.bind(this);
    this.applyKeywordsToListen = this.applyKeywordsToListen.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.applyKeywordsToListen();
  }

  private onNewAcquisition(newAcquisition: Acquisition) {
    this.setState({
      isPressed: parseInt(newAcquisition.value) != 0 ? true : false,
    });
  }

  private applyKeywordsToListen() {
    this.context!.subscribeToKeywordAcquisitions(
      [this.state.buttonKeyword],
      this.acquisitionListener
    );
  }

  private onClick() {
    console.log('Button clicked !');

    const localIsPressed = !this.state.isPressed;

    this.setState({
      isPressed: localIsPressed,
    });

    keywordsApi.sendCommand(
      this.props.buttonKeyword,
      localIsPressed ? '1' : '0'
    );
  }
  render() {
    return (
      <div style={{ border: '1px solid', margin: '10px' }}>
        <h2>
          Button #{this.props.widgetId} on keyword #{this.props.buttonKeyword}
        </h2>
        <Button
          onClick={this.onClick}
          className={`toggle-button ${this.state.isPressed ? 'on' : 'off'}`}
        >
          Click on Me ! {this.state.isPressed ? 'ON' : 'OFF'}
        </Button>
      </div>
    );
  }
}

const connector = connect();
export default connector(YButton);
