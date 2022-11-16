import { Action } from '@ngrx/store';

import * as PluginsInstancesActions from './plugins-instances.actions';
import { PluginInstanceEntity, PluginInstanceState } from './plugins-instances.models';
import {
  PluginsInstancesState,
  initialPluginsInstancesState,
  pluginsInstancesReducer,
} from './plugins-instances.reducer';

describe('PluginsInstances Reducer', () => {
  const createPluginsInstancesEntity = (
    id: number,
    displayName = ''
  ): PluginInstanceEntity => ({
    id,
    displayName,
    type: '',
    configuration: {},
    autoStart: false,
    category: '',
    state: '',
    fullState: {} as PluginInstanceState
  });

  describe('valid PluginsInstances actions', () => {
    it('loadPluginsInstancesSuccess should return the list of known PluginsInstances', () => {
      const pluginsInstances = [
        createPluginsInstancesEntity(1),
        createPluginsInstancesEntity(2),
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
