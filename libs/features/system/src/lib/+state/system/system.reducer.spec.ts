import { Action } from '@ngrx/store';

import * as SystemActions from './system.actions';
import { SystemEntity } from './system.models';
import {
  SystemInformationState,
  initialSystemInformationState,
  systemReducer,
} from './system.reducer';

describe('System Reducer', () => {
  const createSystemEntity = (id: string, name = ''): SystemEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid System actions', () => {
    it('loadSystemSuccess should return the list of known System', () => {
      const system = [
        createSystemEntity('PRODUCT-AAA'),
        createSystemEntity('PRODUCT-zzz'),
      ];
      const action = SystemActions.loadSystemInformationSuccess({ system });

      const result: SystemInformationState = systemReducer(initialSystemInformationState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
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
