import { createReducer, on, Action } from '@ngrx/store';

import * as SystemActions from './system.actions';
import { SystemInformationEntity } from './system.models';

export const SYSTEM_INFORMATION_FEATURE_KEY = 'information';

export interface SystemInformationState {
  loaded: boolean; // has the System list been loaded
  error?: string | null; // last known error (if any)
  information?:  SystemInformationEntity | null;
}

export interface SystemInformationPartialState {
  readonly [SYSTEM_INFORMATION_FEATURE_KEY]: SystemInformationState;
}

export const initialSystemInformationState: SystemInformationState = {
  // set initial required properties
  loaded: false
};

const reducer = createReducer(
  initialSystemInformationState,
  on(SystemActions.initSystem, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SystemActions.loadSystemInformationSuccess, (state, { information }) =>({
    ...state,
    information,
    loaded: true,
    error: null,
  })),
  on(SystemActions.loadSystemInformationFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function systemReducer(state: SystemInformationState | undefined, action: Action) {
  return reducer(state, action);
}
