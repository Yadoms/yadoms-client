import { createAction, props } from '@ngrx/store';
import { DeviceEntity } from './devices.models';

export const initDevices = createAction('[Devices Page] Init');

export const loadDevicesSuccess = createAction(
  '[Devices/API] Load Devices Success',
  props<{ devices: DeviceEntity[] }>()
);

export const loadDevicesFailure = createAction(
  '[Devices/API] Load Devices Failure',
  props<{ error: any }>()
);
