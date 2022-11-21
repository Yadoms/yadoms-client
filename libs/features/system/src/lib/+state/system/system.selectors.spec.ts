import { SystemEntity } from './system.models';
import {
  systemAdapter,
  SystemPartialState,
  initialSystemState,
} from './system.reducer';
import * as SystemSelectors from './system.selectors';

describe('System Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSystemId = (it: SystemEntity) => it.id;
  const createSystemEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SystemEntity);

  let state: SystemPartialState;

  beforeEach(() => {
    state = {
      system: systemAdapter.setAll(
        [
          createSystemEntity('PRODUCT-AAA'),
          createSystemEntity('PRODUCT-BBB'),
          createSystemEntity('PRODUCT-CCC'),
        ],
        {
          ...initialSystemState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('System Selectors', () => {
    it('getAllSystem() should return the list of System', () => {
      const results = SystemSelectors.getAllSystem(state);
      const selId = getSystemId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SystemSelectors.getSelected(state) as SystemEntity;
      const selId = getSystemId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSystemLoaded() should return the current "loaded" status', () => {
      const result = SystemSelectors.getSystemLoaded(state);

      expect(result).toBe(true);
    });

    it('getSystemError() should return the current "error" state', () => {
      const result = SystemSelectors.getSystemError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
