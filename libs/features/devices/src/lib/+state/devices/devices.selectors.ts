import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DEVICES_FEATURE_KEY,
  DevicesState,
  devicesAdapter,
} from './devices.reducer';

// Lookup the 'Devices' feature state managed by NgRx
export const getDevicesState =
  createFeatureSelector<DevicesState>(DEVICES_FEATURE_KEY);

const { selectAll, selectEntities } = devicesAdapter.getSelectors();

export const getDevicesLoaded = createSelector(
  getDevicesState,
  (state: DevicesState) => state.loaded
);

export const getDevicesError = createSelector(
  getDevicesState,
  (state: DevicesState) => state.error
);

export const getAllDevices = createSelector(
  getDevicesState,
  (state: DevicesState) => selectAll(state)
);

export const getDevicesEntities = createSelector(
  getDevicesState,
  (state: DevicesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getDevicesState,
  (state: DevicesState) => state.selectedId
);

export const getSelected = createSelector(
  getDevicesEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
