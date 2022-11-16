import { PluginInstanceEntity } from './plugins-instances.models';
import {
  pluginsInstancesAdapter,
  PluginsInstancesPartialState,
  initialPluginsInstancesState,
} from './plugins-instances.reducer';
import * as PluginsInstancesSelectors from './plugins-instances.selectors';

describe('PluginsInstances Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPluginsInstancesId = (it: PluginInstanceEntity) => it.id;
  const createPluginsInstancesEntity = (id: number, displayName = '') =>
    ({
      id,
      displayName: displayName || `name-${id}`,
      type: '',
      configuration: {},
      autoStart: false,
      category: 'System',
      state: 'Running',
      fullState: {
        state: 'Running',
        messageId: '',
        messageData: '',
      },
    } as PluginInstanceEntity);

  let state: PluginsInstancesPartialState;

  beforeEach(() => {
    state = {
      pluginsInstances: pluginsInstancesAdapter.setAll(
        [
          createPluginsInstancesEntity(1, 'aaa'),
          createPluginsInstancesEntity(2, 'bbb'),
          createPluginsInstancesEntity(3, 'ccc'),
        ],
        {
          ...initialPluginsInstancesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('PluginsInstances Selectors', () => {
    it('getAllPluginsInstances() should return the list of PluginsInstances', () => {
      const results = PluginsInstancesSelectors.getAllPluginsInstances(state);
      const selId = getPluginsInstancesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = PluginsInstancesSelectors.getSelected(
        state
      ) as PluginInstanceEntity;
      const selId = getPluginsInstancesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getPluginsInstancesLoaded() should return the current "loaded" status', () => {
      const result = PluginsInstancesSelectors.getPluginsInstancesLoaded(state);

      expect(result).toBe(true);
    });

    it('getPluginsInstancesError() should return the current "error" state', () => {
      const result = PluginsInstancesSelectors.getPluginsInstancesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
