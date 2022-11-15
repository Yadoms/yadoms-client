import { PluginsInstancesEntity } from './plugins-instances.models';
import {
  pluginsInstancesAdapter,
  PluginsInstancesPartialState,
  initialPluginsInstancesState,
} from './plugins-instances.reducer';
import * as PluginsInstancesSelectors from './plugins-instances.selectors';

describe('PluginsInstances Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPluginsInstancesId = (it: PluginsInstancesEntity) => it.id;
  const createPluginsInstancesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PluginsInstancesEntity);

  let state: PluginsInstancesPartialState;

  beforeEach(() => {
    state = {
      pluginsInstances: pluginsInstancesAdapter.setAll(
        [
          createPluginsInstancesEntity('PRODUCT-AAA'),
          createPluginsInstancesEntity('PRODUCT-BBB'),
          createPluginsInstancesEntity('PRODUCT-CCC'),
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
      ) as PluginsInstancesEntity;
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
