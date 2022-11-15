import { Action } from '@ngrx/store';

import * as PluginsInstancesActions from './plugins-instances.actions';
import { PluginInstanceEntity } from './plugins-instances.models';
import {
  PluginsInstancesState,
  initialPluginsInstancesState,
  pluginsInstancesReducer,
} from './plugins-instances.reducer';

describe('PluginsInstances Reducer', () => {
  const createPluginsInstancesEntity = (
    id: string,
    name = ''
  ): PluginInstanceEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid PluginsInstances actions', () => {
    it('loadPluginsInstancesSuccess should return the list of known PluginsInstances', () => {
      const pluginsInstances = [
        createPluginsInstancesEntity('PRODUCT-AAA'),
        createPluginsInstancesEntity('PRODUCT-zzz'),
      ];
      const action = PluginsInstancesActions.loadPluginsInstancesSuccess({
        pluginsInstances,
      });

      const result: PluginsInstancesState = pluginsInstancesReducer(
        initialPluginsInstancesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = pluginsInstancesReducer(
        initialPluginsInstancesState,
        action
      );

      expect(result).toBe(initialPluginsInstancesState);
    });
  });
});
