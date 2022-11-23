import { Action } from '@ngrx/store';

import * as DevicesActions from './devices.actions';
import { DeviceEntity } from './devices.models';
import {
  DevicesState,
  initialDevicesState,
  devicesReducer
} from './devices.reducer';

describe('Devices Reducer', () => {
  const createDevicesEntity = (id: number, friendlyName = ''): DeviceEntity => ({
    id,
    pluginInstance: 0,
    friendlyName,
    details: {},
    configuration: {},
    type: '',
    blacklisted: false
  });

  describe('valid Devices actions', () => {
    it('loadDevicesSuccess should return the list of known Devices', () => {
      const devices = [
        createDevicesEntity(3, 'first'),
        createDevicesEntity(5, 'second')
      ];
      const action = DevicesActions.loadDevicesSuccess({ devices });

      const result: DevicesState = devicesReducer(initialDevicesState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = devicesReducer(initialDevicesState, action);

      expect(result).toBe(initialDevicesState);
    });
  });
});
