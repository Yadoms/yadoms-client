import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PluginsActions from './plugins.actions';
import { PluginEntity } from './plugins.models';

export const PLUGIN_FEATURE_KEY = 'plugins';

export interface pluginsState extends EntityState<PluginEntity> {
  selectedType?: string; // which Plugin record has been selected
  loaded: boolean; // has the Plugin list been loaded
  error?: string | null; // last known error (if any)
}

export interface PluginPartialState {
  readonly [PLUGIN_FEATURE_KEY]: pluginsState;
}

export const pluginAdapter: EntityAdapter<PluginEntity> =
  createEntityAdapter<PluginEntity>({
    selectId: (plugin: PluginEntity) => plugin.type
  });

export const initialPluginState: pluginsState = pluginAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialPluginState,
  on(PluginsActions.initPlugins, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PluginsActions.loadPluginsSuccess, (state, { plugins }) =>
    pluginAdapter.setAll(plugins, { ...state, loaded: true })
  ),
  on(PluginsActions.loadPluginsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function pluginsReducer(state: pluginsState | undefined, action: Action) {
  return reducer(state, action);
}
