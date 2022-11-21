import { Action } from '@ngrx/store';

import * as SystemActions from './system.actions';
import { SystemInformationEntity } from './system.models';
import {
  SystemInformationState,
  initialSystemInformationState,
  systemReducer,
} from './system.reducer';

describe('System Reducer', () => {
  const createSystemInformationEntity = (platform: string, yadomsVersion: string): SystemInformationEntity => ({
    platform: platform,
    platformFamily: '',
    yadomsVersion: yadomsVersion,
    startupTime: new Date(),
    executablePath: '',
    serverReady: false,
    database: {
      version: '',
      size: 0,
    },
    databaseEngine: {
      type: '',
      version: '',
    },
    backupSupported: false,
    developerMode: false
  });

  describe('valid System actions', () => {
    it('loadSystemSuccess should return the list of known System', () => {
      const information = createSystemInformationEntity('linux', '3.0');
      const action = SystemActions.loadSystemInformationSuccess({ information: information });

      const result: SystemInformationState = systemReducer(initialSystemInformationState, action);

      expect(result.loaded).toBe(true);
      expect(result.information).not.toBe(null);
      expect(result.information?.platform).toBe('linux');
      expect(result.information?.yadomsVersion).toBe('3.0');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = systemReducer(initialSystemInformationState, action);

      expect(result).toBe(initialSystemInformationState);
    });
  });
});
