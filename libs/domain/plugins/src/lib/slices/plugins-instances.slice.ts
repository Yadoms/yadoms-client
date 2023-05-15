import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { pluginsApi } from '../api/plugins-api';
import {
  Paging,
  PluginsInstancesResponse,
} from '../model/PluginsInstancesResponse';

export const PLUGINS_INSTANCES_FEATURE_KEY = 'pluginsInstances';
export enum PuginsInstancesState {
  Unknown = 'Unknown',
  Error = 'Error',
  Stopped = 'Stopped',
  Running = 'Running',
  Custom = 'Custom',
  WaitDebugger = 'WaitDebugger',
}

export interface PluginsInstancesEntity {
  id: number;
  displayName: string;
  type: string;
  autoStart: boolean;
  category: string;
  state: PuginsInstancesState;
  fullState: string;
  configuration: object;
}

export interface PluginsInstancesState
  extends EntityState<PluginsInstancesEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | undefined | null;
  paging: Paging;
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
  async ({ page, pageSize }: { page: number; pageSize: number }, thunkAPI) => {
    try {
      return await pluginsApi.loadPluginsInstances(page, pageSize);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePluginsInstance = createAsyncThunk(
  'pluginsInstances/update',
  async ({ id, data }: { id: number; data: object }, thunkAPI) => {
    try {
      return await pluginsApi.savePluginsInstance(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const startStopPluginsInstance = createAsyncThunk(
  'pluginsInstances/startStop',
  async ({ id, start }: { id: number; start: boolean }, thunkAPI) => {
    try {
      return await pluginsApi.startStopPluginsInstance(id, start);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const initialPluginsInstancesState: PluginsInstancesState =
  pluginsInstancesAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
    paging: {
      currentPage: 0,
      totalPage: 1,
      pageSize: 10,
    },
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
          action: PayloadAction<PluginsInstancesResponse>
        ) => {
          pluginsInstancesAdapter.setAll(state, action.payload.instances);
          state.loadingStatus = 'loaded';
          state.paging = {
            currentPage: action.payload.paging.currentPage,
            totalPage: action.payload.paging.totalPage,
            pageSize: action.payload.paging.pageSize,
          };
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
export const pluginsInstancesReducer = pluginsInstancesSlice.reducer;
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

export const getPluginsInstancesLoadingStatus = createSelector(
  getPluginsInstancesState,
  (state) => state.loadingStatus
);

export const getPluginsInstancesPaging = createSelector(
  getPluginsInstancesState,
  (state) => state.paging
);
