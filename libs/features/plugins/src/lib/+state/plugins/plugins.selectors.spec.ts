import { PluginEntity } from './plugins.models';
import {
  pluginAdapter,
  PluginPartialState,
  initialPluginState,
} from './plugins.reducer';
import * as PluginsSelectors from './plugins.selectors';

describe('Plugin Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPluginType = (it: PluginEntity) => it.type;
  const createPluginEntity = (
    type: string,
    version = '1.2.3',
    author = 'author'
  ) =>
    ({
      type,
      version,
      author,
      url: '',
      supportManuallyCreatedDevice: false,
      supportDeviceRemovedNotification: false,
      package: {},
    } as PluginEntity);

  let state: PluginPartialState;

  beforeEach(() => {
    state = {
      plugins: pluginAdapter.setAll(
        [
          createPluginEntity('RFXCom'),
          createPluginEntity('EnOcean', '4.5.6', 'me'),
          createPluginEntity('LaMetricTime', '0.0.7', 'James'),
        ],
        {
          ...initialPluginState,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Plugin Selectors', () => {
    it('getAllPlugin() should return the list of Plugins', () => {
      const results = PluginsSelectors.getAllPlugins(state);
      const selType = getPluginType(results[1]);

      expect(results.length).toBe(3);
      expect(selType).toBe('EnOcean');
    });

    it('getPluginLoaded() should return the current "loaded" status', () => {
      const result = PluginsSelectors.getPluginLoaded(state);

      expect(result).toBe(true);
    });

    it('getPluginError() should return the current "error" state', () => {
      const result = PluginsSelectors.getPluginError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
