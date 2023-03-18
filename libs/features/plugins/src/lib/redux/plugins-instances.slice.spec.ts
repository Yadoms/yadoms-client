import {
  fetchPluginsInstances,
  pluginsInstancesAdapter,
  pluginsInstancesReducer,
} from './plugins-instances.slice';

describe('pluginsInstances reducer', () => {
  it('should handle initial state', () => {
    const expected = pluginsInstancesAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(pluginsInstancesReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchPluginsInstancess', () => {
    let state = pluginsInstancesReducer(
      undefined,
      fetchPluginsInstances.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = pluginsInstancesReducer(
      state,
      fetchPluginsInstances.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = pluginsInstancesReducer(
      state,
      fetchPluginsInstances.rejected(new Error('Uh oh'), null, null)
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
