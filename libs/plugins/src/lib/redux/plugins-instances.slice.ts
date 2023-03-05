import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const PLUGINS_INSTANCES_FEATURE_KEY = 'pluginsInstances';

/*
 * Update these interfaces according to your requirements.
 */
export interface PluginsInstancesEntity {
  id: number;
  displayName: string;
  type: string;
  autoStart: boolean;
  category: string;
  state: string;
  fullState: { state: string; messageId: string; messageData: string };
  configuration: any;
}

export interface PluginsInstancesState
  extends EntityState<PluginsInstancesEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const pluginsInstancesAdapter =
  createEntityAdapter<PluginsInstancesEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchPluginsInstances())
 * }, [dispatch]);
 * ```
 */
export const fetchPluginsInstances = createAsyncThunk(
  'pluginsInstances/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getPluginsInstancess()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialPluginsInstancesState: PluginsInstancesState =
  pluginsInstancesAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const pluginsInstancesSlice = createSlice({
  name: PLUGINS_INSTANCES_FEATURE_KEY,
  initialState: initialPluginsInstancesState,
  reducers: {
    add: pluginsInstancesAdapter.addOne,
    remove: pluginsInstancesAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPluginsInstances.pending,
        (state: PluginsInstancesState) => {
          state.loadingStatus = 'loading';
        }
      )
      .addCase(
        fetchPluginsInstances.fulfilled,
        (
          state: PluginsInstancesState,
          action: PayloadAction<PluginsInstancesEntity[]>
        ) => {
          pluginsInstancesAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchPluginsInstances.rejected,
        (state: PluginsInstancesState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const pluginsInstancesReducer = pluginsInstancesSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(pluginsInstancesActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const pluginsInstancesActions = pluginsInstancesSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllPluginsInstances);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = pluginsInstancesAdapter.getSelectors();

export const getPluginsInstancesState = (
  rootState: unknown
): PluginsInstancesState => rootState[PLUGINS_INSTANCES_FEATURE_KEY];

export const selectAllPluginsInstances = createSelector(
  getPluginsInstancesState,
  selectAll
);

export const selectPluginsInstancesEntities = createSelector(
  getPluginsInstancesState,
  selectEntities
);
