import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SYSTEM_FEATURE_KEY,
  SystemState,
  systemAdapter,
} from './system.reducer';

// Lookup the 'System' feature state managed by NgRx
export const getSystemState =
  createFeatureSelector<SystemState>(SYSTEM_FEATURE_KEY);

const { selectAll, selectEntities } = systemAdapter.getSelectors();

export const getSystemLoaded = createSelector(
  getSystemState,
  (state: SystemState) => state.loaded
);

export const getSystemError = createSelector(
  getSystemState,
  (state: SystemState) => state.error
);

export const getAllSystem = createSelector(
  getSystemState,
  (state: SystemState) => selectAll(state)
);

export const getSystemEntities = createSelector(
  getSystemState,
  (state: SystemState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSystemState,
  (state: SystemState) => state.selectedId
);

export const getSelected = createSelector(
  getSystemEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
