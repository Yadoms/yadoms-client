import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INFORMATION_FEATURE_KEY,
  InformationState,
  informationAdapter,
} from './information.reducer';

// Lookup the 'Information' feature state managed by NgRx
export const getInformationState = createFeatureSelector<InformationState>(
  INFORMATION_FEATURE_KEY
);

const { selectAll, selectEntities } = informationAdapter.getSelectors();

export const getInformationLoaded = createSelector(
  getInformationState,
  (state: InformationState) => state.loaded
);

export const getInformationError = createSelector(
  getInformationState,
  (state: InformationState) => state.error
);

export const getAllInformation = createSelector(
  getInformationState,
  (state: InformationState) => selectAll(state)
);

export const getInformationEntities = createSelector(
  getInformationState,
  (state: InformationState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getInformationState,
  (state: InformationState) => state.selectedId
);

export const getSelected = createSelector(
  getInformationEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
