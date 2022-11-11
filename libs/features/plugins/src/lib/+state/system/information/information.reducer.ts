import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as InformationActions from './information.actions';
import { SystemInformationEntity } from './information.models';

export const INFORMATION_FEATURE_KEY = 'information';

export interface InformationState extends EntityState<SystemInformationEntity> {
  selectedId?: string | number; // which Information record has been selected
  loaded: boolean; // has the Information list been loaded
  error?: string | null; // last known error (if any)
}

export interface InformationPartialState {
  readonly [INFORMATION_FEATURE_KEY]: InformationState;
}

export const informationAdapter: EntityAdapter<SystemInformationEntity> =
  createEntityAdapter<SystemInformationEntity>();

export const initialInformationState: InformationState =
  informationAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialInformationState,
  on(InformationActions.initInformation, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(InformationActions.loadInformationSuccess, (state, { information }) =>
    informationAdapter.setAll(information, { ...state, loaded: true })
  ),
  on(InformationActions.loadInformationFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function informationReducer(
  state: InformationState | undefined,
  action: Action
) {
  return reducer(state, action);
}
