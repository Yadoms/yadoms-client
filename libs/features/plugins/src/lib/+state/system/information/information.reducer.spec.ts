import { Action } from '@ngrx/store';

import * as InformationActions from './information.actions';
import { SystemInformationEntity } from './information.models';
import {
  InformationState,
  initialInformationState,
  informationReducer,
} from './information.reducer';

describe('Information Reducer', () => {
  const createInformationEntity = (
    id: string,
    name = ''
  ): SystemInformationEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Information actions', () => {
    it('loadInformationSuccess should return the list of known Information', () => {
      const information = [
        createInformationEntity('PRODUCT-AAA'),
        createInformationEntity('PRODUCT-zzz'),
      ];
      const action = InformationActions.loadInformationSuccess({ information });

      const result: InformationState = informationReducer(
        initialInformationState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = informationReducer(initialInformationState, action);

      expect(result).toBe(initialInformationState);
    });
  });
});
