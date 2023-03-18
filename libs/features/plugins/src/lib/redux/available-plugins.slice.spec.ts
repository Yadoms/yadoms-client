import {
  fetchAvailablePlugins,
  availablePluginsAdapter,
  availablePluginsReducer,
} from './available-plugins.slice';

describe('availablePlugins reducer', () => {
  it('should handle initial state', () => {
    const expected = availablePluginsAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(availablePluginsReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchAvailablePluginss', () => {
    let state = availablePluginsReducer(
      undefined,
      fetchAvailablePlugins.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = availablePluginsReducer(
      state,
      fetchAvailablePlugins.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = availablePluginsReducer(
      state,
      fetchAvailablePlugins.rejected(new Error('Uh oh'), null, null)
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
