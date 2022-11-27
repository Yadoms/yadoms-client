import { createAction, props } from '@ngrx/store';
import { SystemInformationEntity } from './system.models';

export const initSystem = createAction('[System Page] Init');

export const loadSystemInformationSuccess = createAction(
  '[System/API] Load System Information Success',
  props<{ information: SystemInformationEntity }>()
);

export const loadSystemInformationFailure = createAction(
  '[System/API] Load System Information Failure',
  props<{ error: any }>()
);
