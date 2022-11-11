import { createAction, props } from '@ngrx/store';
import { SystemInformationEntity } from './information.models';

export const initInformation = createAction('[Information Page] Init');

export const loadInformationSuccess = createAction(
  '[Information/API] Load Information Success',
  props<{ information: SystemInformationEntity[] }>()
);

export const loadInformationFailure = createAction(
  '[Information/API] Load Information Failure',
  props<{ error: any }>()
);
