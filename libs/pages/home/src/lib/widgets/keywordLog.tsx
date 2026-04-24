import { Component } from 'react';
import {
  YadomsConnectionContext,
  Acquisition,
  AcquisitionListener,
  parseYadomsDate,
} from '@yadoms/shared';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextInput } from '@mantine/core';
import { WidgetProps, Widget } from './Widget';
import { widgetsApi } from '@yadoms/domain/widgets';
import { keywordsApi } from '@yadoms/domain/keywords';

interface KeywordLogState {
  myAcquisitions: Acquisition[];
  keywordsToListen: string;
}

interface KeywordLogConfiguration {
  devices: [
    {
      deviceId: number; //TODO utile ?
      keywordId: number;
    }
  ];
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

class KeywordLog extends Component<WidgetProps, KeywordLogState> {
  static contextType = YadomsConnectionContext;
  context!: React.ContextType<typeof YadomsConnectionContext>;

  acquisitionListener: KeywordLogAcquisitionListener;

  constructor(props: WidgetProps) {
    super(props);
    console.log('KeywordLog creation #' + props.id);

    this.state = {
      myAcquisitions: [],
      keywordsToListen: '',
    };

    this.acquisitionListener = new KeywordLogAcquisitionListener(
      this.onNewAcquisition.bind(this)
    );

    this.onNewAcquisition = this.onNewAcquisition.bind(this);
    this.applyKeywordsToListen = this.applyKeywordsToListen.bind(this);
    this.handleKeywordsToListenChange =
      this.handleKeywordsToListenChange.bind(this);
  }

  async componentDidMount() {
    try {
      const configuration =
        await widgetsApi.getWidgetConfiguration<KeywordLogConfiguration>(
          this.props.id
        );
      const keywordIds = configuration.devices.map(
        (device) => device.keywordId
      );
      const acquisitionsResponse = await keywordsApi.getLatestAcquisitions(
        keywordIds,
        10
      );

      // Transform API acquisitions to shared Acquisition type
      const acquisitions: Acquisition[] =
        acquisitionsResponse.acquisitions.flatMap((existingAcquisitions) =>
          existingAcquisitions.acquisitions.map((acq) => ({
            date: parseYadomsDate(acq.date),
            keyword: existingAcquisitions.keywordId,
            value:
              typeof acq.value === 'string' ? acq.value : String(acq.value),
          }))
        );

      // SSort acquisitions by date desc
      acquisitions.sort((a, b) => b.date.getTime() - a.date.getTime());

      console.debug(
        'keywordLog configuration for widget #' + this.props.id,
        configuration
      );
      console.debug(
        'keywordLog acquisitions for widget #' + this.props.id,
        acquisitions
      );

      this.setState({
        myAcquisitions: acquisitions,
        keywordsToListen: keywordIds.join(', '),
      });
    } catch (error) {
      console.error('Failed to load configuration:', error);
      // Handle error, e.g., set default state or show error UI
    }

    this.applyKeywordsToListen();
  }

  private parseKeywordsToListen(value: string): number[] {
    //TODO utile ?
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
    this.context?.subscribeToKeywordAcquisitions(
      this.parseKeywordsToListen(this.state.keywordsToListen), //TODO récupérer les keywordIds depuis la configuration du widget
      this.acquisitionListener
    );
  }

  private handleSettingsClick() {
    console.log('Settings button clicked !');
  }

  private handleKeywordsToListenChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    this.setState({ keywordsToListen: event.currentTarget.value });
  }

  render() {
    return (
      <Widget
        id={this.props.id}
        onSettingsClick={this.handleSettingsClick}
        size={this.props.size ?? 'wide'}
      >
        <div style={{ margin: '10px', height: '100%', width: '100%' }}>
          <h2>Keyword Log #{this.props.id}</h2>
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
      </Widget>
    );
  }
}

export default KeywordLog;
