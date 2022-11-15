import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PLUGINS_INSTANCES_FEATURE_KEY,
  PluginsInstancesState,
  pluginsInstancesAdapter,
} from './plugins-instances.reducer';

// Lookup the 'PluginsInstances' feature state managed by NgRx
export const getPluginsInstancesState =
  createFeatureSelector<PluginsInstancesState>(PLUGINS_INSTANCES_FEATURE_KEY);

const { selectAll, selectEntities } = pluginsInstancesAdapter.getSelectors();

export const getPluginsInstancesLoaded = createSelector(
  getPluginsInstancesState,
  (state: PluginsInstancesState) => state.loaded
);

export const getPluginsInstancesError = createSelector(
  getPluginsInstancesState,
  (state: PluginsInstancesState) => state.error
);

export const getAllPluginsInstances = createSelector(
  getPluginsInstancesState,
  (state: PluginsInstancesState) => selectAll(state)
);

export const getPluginsInstancesEntities = createSelector(
  getPluginsInstancesState,
  (state: PluginsInstancesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getPluginsInstancesState,
  (state: PluginsInstancesState) => state.selectedId
);

export const getSelected = createSelector(
  getPluginsInstancesEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
