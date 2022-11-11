import { SystemInformationEntity } from './information.models';
import {
  informationAdapter,
  InformationPartialState,
  initialInformationState,
} from './information.reducer';
import * as InformationSelectors from './information.selectors';

describe('Information Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getInformationId = (it: SystemInformationEntity) => it.id;
  const createInformationEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SystemInformationEntity);

  let state: InformationPartialState;

  beforeEach(() => {
    state = {
      information: informationAdapter.setAll(
        [
          createInformationEntity('PRODUCT-AAA'),
          createInformationEntity('PRODUCT-BBB'),
          createInformationEntity('PRODUCT-CCC'),
        ],
        {
          ...initialInformationState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Information Selectors', () => {
    it('getAllInformation() should return the list of Information', () => {
      const results = InformationSelectors.getAllInformation(state);
      const selId = getInformationId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = InformationSelectors.getSelected(
        state
      ) as SystemInformationEntity;
      const selId = getInformationId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getInformationLoaded() should return the current "loaded" status', () => {
      const result = InformationSelectors.getInformationLoaded(state);

      expect(result).toBe(true);
    });

    it('getInformationError() should return the current "error" state', () => {
      const result = InformationSelectors.getInformationError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
