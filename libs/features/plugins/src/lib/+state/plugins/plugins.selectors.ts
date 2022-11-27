import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PLUGIN_FEATURE_KEY,
  pluginsState,
  pluginAdapter,
} from './plugins.reducer';

// Lookup the 'Plugin' feature state managed by NgRx
export const getPluginState =
  createFeatureSelector<pluginsState>(PLUGIN_FEATURE_KEY);

const { selectAll } = pluginAdapter.getSelectors();

export const getPluginLoaded = createSelector(
  getPluginState,
  (state: pluginsState) => state.loaded
);

export const getPluginError = createSelector(
  getPluginState,
  (state: pluginsState) => state.error
);

export const getAllPlugins = createSelector(
  getPluginState,
  (state: pluginsState) => selectAll(state)
);
