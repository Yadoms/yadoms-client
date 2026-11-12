import { Component } from 'react';
import {
  YadomsConnectionContext,
  Acquisition,
  AcquisitionListener,
  parseYadomsDate,
} from '@yadoms/shared';
import { v4 as uuidv4 } from 'uuid';
import { WidgetProps, Widget } from './Widget';
import { widgetsApi } from '@yadoms/domain/widgets';
import { keywordsApi } from '@yadoms/domain/keywords';

interface KeywordLogState {
  myAcquisitions: Acquisition[];
  keywordIds: number[];
  title: string;
  keywordFriendlyNames: Map<number, string>;
}

interface KeywordLogConfiguration {
  keywordIds: number[];
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
  configuration?: KeywordLogConfiguration;

  acquisitionsHistoryDepth = 6;

  constructor(props: WidgetProps) {
    super(props);
    console.log('KeywordLog creation #' + props.id);

    this.state = {
      myAcquisitions: [],
      keywordIds: [],
      title: '',
      keywordFriendlyNames: new Map(),
    };

    this.acquisitionListener = new KeywordLogAcquisitionListener(
      this.onNewAcquisition.bind(this)
    );

    this.onNewAcquisition = this.onNewAcquisition.bind(this);
    this.handleSettingsChanged = this.handleSettingsChanged.bind(this);
  }

  async componentDidMount() {
    try {
      const widget = await widgetsApi.getWidget<KeywordLogConfiguration>(
        this.props.id
      );
      this.configuration = widget.configuration;
      console.debug(
        'keywordLog configuration for widget #' + this.props.id,
        this.configuration
      );
      this.setState({ title: widget.title });
      await this.applyKeywords(this.configuration.keywordIds);
    } catch (error) {
      console.error('Failed to load configuration:', error);
      // Handle error, e.g., set default state or show error UI
    }
  }

  private async loadKeywordFriendlyNames(keywordIds: number[]) {
    try {
      const keywordFriendlyNames = await keywordsApi.getFriendlyNames(
        keywordIds
      );
      this.setState({ keywordFriendlyNames });
    } catch (error) {
      console.error('Failed to load keywords friendly names:', error);
    }
  }

  private get defaultTitle() {
    return this.state.keywordIds
      .map((id) => this.state.keywordFriendlyNames.get(id))
      .filter((name): name is string => !!name)
      .join(', ');
  }

  private get displayedTitle() {
    return (
      this.state.title || this.defaultTitle || `Keyword Log #${this.props.id}`
    );
  }

  private async applyKeywords(keywordIds: number[]) {
    this.setState({ keywordIds });
    this.context?.subscribeToKeywordAcquisitions(
      keywordIds,
      this.acquisitionListener
    );
    void this.loadKeywordFriendlyNames(keywordIds);

    const acquisitionsResponse = await keywordsApi.getLatestAcquisitions(
      keywordIds,
      10
    );

    // Transform API acquisitions to shared Acquisition type
    let acquisitions: Acquisition[] = acquisitionsResponse.acquisitions.flatMap(
      (existingAcquisitions) =>
        existingAcquisitions.acquisitions.map((acq) => ({
          date: parseYadomsDate(acq.date),
          keyword: existingAcquisitions.keywordId,
          value: typeof acq.value === 'string' ? acq.value : String(acq.value),
        }))
    );

    // SSort acquisitions by date desc
    acquisitions = acquisitions
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, this.acquisitionsHistoryDepth);

    console.debug(
      'keywordLog acquisitions for widget #' + this.props.id,
      acquisitions
    );

    this.setState({
      myAcquisitions: acquisitions,
    });
  }

  private async handleSettingsChanged(keywordIds: number[], title: string) {
    if (!this.configuration)
      throw new Error('Widget configuration is not loaded');

    const newConfiguration: KeywordLogConfiguration = {
      ...this.configuration,
      keywordIds,
    };
    await widgetsApi.updateWidget(this.props.id, {
      title,
      configuration: newConfiguration,
    });
    this.configuration = newConfiguration;
    this.setState({ title });

    try {
      await this.applyKeywords(keywordIds);
    } catch (error) {
      console.error('Failed to load acquisitions:', error);
    }
  }

  private onNewAcquisition(newAcquisition: Acquisition) {
    this.setState((prevState) => ({
      myAcquisitions: [newAcquisition, ...prevState.myAcquisitions].slice(
        0,
        this.acquisitionsHistoryDepth
      ),
    }));
  }

  private handleSettingsClick() {
    console.log('Settings button clicked !');
  }

  render() {
    return (
      <Widget
        id={this.props.id}
        title={this.state.title}
        defaultTitle={this.defaultTitle}
        keywordIds={this.state.keywordIds}
        onSettingsClick={this.handleSettingsClick}
        onSettingsChanged={this.handleSettingsChanged}
        size={this.props.size ?? 'wide'}
      >
        <div style={{ margin: '10px', height: '100%', width: '100%' }}>
          <h2>{this.displayedTitle}</h2>
          <div>
            {this.state.myAcquisitions.map((acq) => (
              <p
                key={uuidv4()}
                style={{ fontSize: '0.85rem', margin: '4px 0' }}
              >
                [{acq.date.toLocaleTimeString()}] kwd #{acq.keyword} ={' '}
                {acq.value}
              </p>
            ))}
          </div>
        </div>
      </Widget>
    );
  }
}

export default KeywordLog;
