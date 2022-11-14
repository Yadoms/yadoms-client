import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PluginActions from './plugin.actions';
import { PluginEntity } from './plugin.models';

export const PLUGIN_FEATURE_KEY = 'plugins';

export interface pluginState extends EntityState<PluginEntity> {
  selectedType?: string; // which Plugin record has been selected
  loaded: boolean; // has the Plugin list been loaded
  error?: string | null; // last known error (if any)
}

export interface PluginPartialState {
  readonly [PLUGIN_FEATURE_KEY]: pluginState;
}

export const pluginAdapter: EntityAdapter<PluginEntity> =
  createEntityAdapter<PluginEntity>();

export const initialPluginState: pluginState =
  pluginAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialPluginState,
  on(PluginActions.initPlugins, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PluginActions.loadPluginsSuccess, (state, { plugins }) =>
    pluginAdapter.setAll(plugins, { ...state, loaded: true })
  ),
  on(PluginActions.loadPluginsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function pluginReducer(
  state: pluginState | undefined,
  action: Action
) {
  return reducer(state, action);
}
