import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PLUGIN_FEATURE_KEY,
  pluginState,
  pluginAdapter,
} from './plugin.reducer';

// Lookup the 'Plugin' feature state managed by NgRx
export const getPluginState = createFeatureSelector<pluginState>(
  PLUGIN_FEATURE_KEY
);

const { selectAll, selectEntities } = pluginAdapter.getSelectors();

export const getPluginLoaded = createSelector(
  getPluginState,
  (state: pluginState) => state.loaded
);

export const getPluginError = createSelector(
  getPluginState,
  (state: pluginState) => state.error
);

export const getAllPlugins = createSelector(
  getPluginState,
  (state: pluginState) => selectAll(state)
);

export const getPluginEntities = createSelector(
  getPluginState,
  (state: pluginState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getPluginState,
  (state: pluginState) => state.selectedType
);

export const getSelected = createSelector(
  getPluginEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
