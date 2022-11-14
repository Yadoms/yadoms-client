import { PluginEntity } from './plugin.models';
import {
  pluginAdapter,
  PluginPartialState,
  initialPluginState,
} from './plugin.reducer';
import * as PluginSelectors from './plugin.selectors';

describe('Plugin Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPluginType = (it: PluginEntity) => it.type;
  const createPluginEntity = (
    type: string,
    version = '1.2.3',
    author = 'author'
  ) => ({
    type,
    version,
    author,
    url: '',
    supportManuallyCreatedDevice: false,
    supportDeviceRemovedNotification: false,
    package: {}
  } as PluginEntity);

  let state: PluginPartialState;

  beforeEach(() => {
    state = {
      plugin: pluginAdapter.setAll(
        [
          createPluginEntity('RFXCom'),
          createPluginEntity('EnOcean', '4.5.6', 'me'),
          createPluginEntity('LaMetricTime', '0.0.7', 'James')
        ],
        {
          ...initialPluginState,
          selectedId: 'EnOcean',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Plugin Selectors', () => {
    it('getAllPlugin() should return the list of Plugins', () => {
      const results = PluginSelectors.getAllPlugins(state);
      const selType = getPluginType(results[1]);

      expect(results.length).toBe(3);
      expect(selType).toBe('RFXCom');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = PluginSelectors.getSelected(
        state
      ) as PluginEntity;
      const selType = getPluginType(result);

      expect(selType).toBe('EnOcean');
    });

    it('getPluginLoaded() should return the current "loaded" status', () => {
      const result = PluginSelectors.getPluginLoaded(state);

      expect(result).toBe(true);
    });

    it('getPluginError() should return the current "error" state', () => {
      const result = PluginSelectors.getPluginError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
