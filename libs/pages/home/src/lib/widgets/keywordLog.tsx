import { Component } from 'react';
import {
  YadomsConnectionContext,
  Acquisition,
  AcquisitionListener,
  parseYadomsDate,
} from '@yadoms/shared';
import { v4 as uuidv4 } from 'uuid';
import { getI18n } from 'react-i18next';
import { WidgetProps, Widget, loadWidget, saveWidget } from './Widget';
import {
  devicesApi,
  formatKeywordLabel,
  keywordsApi,
} from '@yadoms/domain/keywords';

interface KeywordLogState {
  myAcquisitions: Acquisition[];
  keywordIds: number[];
  title: string;
  keywordFriendlyNames: Map<number, string>;
  keywordLabels: Map<number, string>;
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

  acquisitionsHistoryDepth = 20;

  constructor(props: WidgetProps) {
    super(props);
    console.log('KeywordLog creation #' + props.id);

    this.state = {
      myAcquisitions: [],
      keywordIds: [],
      title: '',
      keywordFriendlyNames: new Map(),
      keywordLabels: new Map(),
    };

    this.acquisitionListener = new KeywordLogAcquisitionListener(
      this.onNewAcquisition.bind(this)
    );

    this.onNewAcquisition = this.onNewAcquisition.bind(this);
    this.handleSettingsChanged = this.handleSettingsChanged.bind(this);
  }

  async componentDidMount() {
    try {
      const widget = await loadWidget<KeywordLogConfiguration>(this.props);
      this.configuration = widget.configuration;
      console.debug(
        'keywordLog configuration for widget #' + this.props.id,
        this.configuration
      );
      this.setState({ title: widget.title });
      await this.applyKeywords(this.configuration.keywordIds ?? []);
    } catch (error) {
      console.error('Failed to load configuration:', error);
      // Handle error, e.g., set default state or show error UI
    }
  }

  private async loadKeywordFriendlyNames(keywordIds: number[]) {
    try {
      const keywords = await keywordsApi.getKeywords(keywordIds);
      const deviceNames = await devicesApi.getFriendlyNames(
        keywords.map((k) => k.deviceId)
      );
      const keywordFriendlyNames = new Map<number, string>();
      const keywordLabels = new Map<number, string>();
      for (const keyword of keywords) {
        keywordFriendlyNames.set(keyword.id, keyword.friendlyName);
        keywordLabels.set(
          keyword.id,
          formatKeywordLabel(keyword, deviceNames.get(keyword.deviceId))
        );
      }
      this.setState({ keywordFriendlyNames, keywordLabels });
    } catch (error) {
      console.error('Failed to load keywords friendly names:', error);
    }
  }

  private get defaultTitle() {
    return this.state.keywordIds
      .map((id) => this.state.keywordLabels.get(id))
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

    if (keywordIds.length === 0) {
      this.setState({ myAcquisitions: [] });
      return;
    }

    const acquisitionsResponse = await keywordsApi.getLatestAcquisitions(
      keywordIds,
      this.acquisitionsHistoryDepth
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
    await saveWidget(this.props, { title, configuration: newConfiguration });
    if (this.props.creation) return;

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
        showDeviceStatus={false}
        onSettingsClick={this.handleSettingsClick}
        onSettingsChanged={this.handleSettingsChanged}
        size={this.props.size ?? 'wide'}
        editMode={this.props.editMode}
        creation={this.props.creation}
        onDelete={this.props.onDelete}
      >
        <div style={{ margin: '10px', height: '100%', width: '100%' }}>
          <h2>{this.displayedTitle}</h2>
          <div style={{ height: '200px', overflowY: 'auto' }}>
            {this.state.myAcquisitions.map((acq) => (
              <p
                key={uuidv4()}
                style={{ fontSize: '0.85rem', margin: '4px 0' }}
              >
                [{acq.date.toLocaleTimeString(getI18n()?.language)}]{' '}
                {this.state.keywordFriendlyNames.get(acq.keyword) ??
                  `#${acq.keyword}`}{' '}
                = {acq.value}
              </p>
            ))}
          </div>
        </div>
      </Widget>
    );
  }
}

export default KeywordLog;
