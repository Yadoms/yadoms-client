import { Action } from '@ngrx/store';

import * as PluginActions from './plugins.actions';
import { PluginEntity } from './plugins.models';
import {
  pluginsState,
  initialPluginState,
  pluginsReducer,
} from './plugins.reducer';

describe('Plugin Reducer', () => {
  const createPluginEntity = (
    type: string,
    version = '1.2.3',
    author = 'author'
  ): PluginEntity => ({
    type,
    version,
    author,
    url: '',
    supportManuallyCreatedDevice: false,
    supportDeviceRemovedNotification: false,
    package: {},
  });

  describe('valid Plugin actions', () => {
    it('loadPluginSuccess should return the list of known Plugins', () => {
      const plugins = [
        createPluginEntity('RFXCom'),
        createPluginEntity('EnOcean', '4.5.6', 'me'),
      ];
      const action = PluginActions.loadPluginsSuccess({ plugins });

      const result: pluginsState = pluginsReducer(initialPluginState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = pluginsReducer(initialPluginState, action);

      expect(result).toBe(initialPluginState);
    });
  });
});
