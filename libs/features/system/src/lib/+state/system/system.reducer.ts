import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as SystemActions from './system.actions';
import { SystemInformationEntity } from './system.models';

export const SYSTEM_FEATURE_KEY = 'system';

export interface SystemState extends EntityState<SystemInformationEntity> {
  selectedId?: string | number; // which System record has been selected
  loaded: boolean; // has the System list been loaded
  error?: string | null; // last known error (if any)
}

export interface SystemPartialState {
  readonly [SYSTEM_FEATURE_KEY]: SystemState;
}

export const systemAdapter: EntityAdapter<SystemInformationEntity> =
  createEntityAdapter<SystemInformationEntity>();

export const initialSystemState: SystemState = systemAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialSystemState,
  on(SystemActions.initSystem, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SystemActions.loadSystemSuccess, (state, { information }) =>
    systemAdapter.setOne(information, { ...state, loaded: true })
  ),
  on(SystemActions.loadSystemFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function systemReducer(state: SystemState | undefined, action: Action) {
  return reducer(state, action);
}
