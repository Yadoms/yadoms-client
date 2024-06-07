import { Component } from 'react';
import {
  YadomsConnectionContext,
  Acquisition,
  AcquisitionListener,
} from '@yadoms/shared';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextInput } from '@mantine/core';
import { WidgetProps } from './Widget';

export interface KeywordLogProps extends WidgetProps {
  keywordsToListen: string;
}

interface KeywordLogState {
  myAcquisitions: Acquisition[];
  keywordsToListen: string;
}

class KeywordLogAcquisitionListener implements AcquisitionListener {
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

class KeywordLog extends Component<KeywordLogProps, KeywordLogState> {
  static contextType = YadomsConnectionContext;
  context!: React.ContextType<typeof YadomsConnectionContext>;

  acquisitionListener: KeywordLogAcquisitionListener;

  constructor(props: KeywordLogProps) {
    super(props);
    console.log('KeywordLog creation #' + props.widgetId);

    this.state = {
      myAcquisitions: [],
      keywordsToListen: props.keywordsToListen,
    };

    this.acquisitionListener = new KeywordLogAcquisitionListener(
      this.onNewAcquisition.bind(this)
    );

    this.onNewAcquisition = this.onNewAcquisition.bind(this);
    this.applyKeywordsToListen = this.applyKeywordsToListen.bind(this);
    this.handleKeywordsToListenChange =
      this.handleKeywordsToListenChange.bind(this);
  }

  componentDidMount() {
    this.applyKeywordsToListen();
  }

  private parseKeywordsToListen(value: string) {
    return value.split(',').map((element) => {
      return parseInt(element, 10);
    });
  }

  private onNewAcquisition(newAcquisition: Acquisition) {
    this.setState((prevState) => ({
      myAcquisitions: [newAcquisition, ...prevState.myAcquisitions].slice(0, 4),
    }));
  }

  private applyKeywordsToListen() {
    this.context!.subscribeToKeywordAcquisitions(
      this.parseKeywordsToListen(this.state.keywordsToListen),
      this.acquisitionListener
    );
  }

  private handleKeywordsToListenChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    this.setState({ keywordsToListen: event.currentTarget.value });
  }

  render() {
    return (
      <div style={{ border: '1px solid', margin: '10px' }}>
        <h2>Keyword Log #{this.props.widgetId}</h2>
        <TextInput
          data-autofocus
          label="Select keywords to listen (comma separated)"
          value={this.state.keywordsToListen}
          onChange={this.handleKeywordsToListenChange}
        />
        <Button onClick={this.applyKeywordsToListen} type="submit">
          Apply
        </Button>
        {this.state.myAcquisitions.map((acq) => (
          <p key={uuidv4()}>
            [{acq.date.toLocaleTimeString()}] kwd #{acq.keyword} = {acq.value}
          </p>
        ))}
      </div>
    );
  }
}

export default KeywordLog;
