import { fetchTest, testAdapter, testReducer } from './test.slice';

describe('test reducer', () => {
  it('should handle initial state', () => {
    const expected = testAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(testReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchTests', () => {
    let state = testReducer(undefined, fetchTest.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = testReducer(state, fetchTest.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = testReducer(
      state,
      fetchTest.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
