import { createAction, props } from '@ngrx/store';
import { SystemInformationEntity } from './system.models';

export const initSystem = createAction('[System Page] Init');

export const loadSystemSuccess = createAction(
  '[System/API] Load System Success',
  props<{ information: SystemInformationEntity }>()
);

export const loadSystemFailure = createAction(
  '[System/API] Load System Failure',
  props<{ error: any }>()
);
