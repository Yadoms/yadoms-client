import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { widgetsApi } from '../api/widgets-api';
import { WidgetsResponse } from '../model/WidgetsResponse';
import { RootState } from '@yadoms/store';

export const WIDGETS_FEATURE_KEY = 'widgets';

export interface WidgetEntity {
  id: number;
  page: number;
  type: string;
  position: number;
  configuration: object;
}

export interface WidgetsState extends EntityState<WidgetEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | undefined | null;
}

export const WidgetsAdapter = createEntityAdapter<WidgetEntity>();

export const fetchWidgets = createAsyncThunk(
  'widgets/fetch',
  async (_, thunkAPI) => {
    try {
      return await widgetsApi.loadWidgets();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        // Handle other types of errors if needed
        return thunkAPI.rejectWithValue('Unknown error occurred');
      }
    }
  }
);

export const initialWidgetsState: WidgetsState = WidgetsAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: null,
    paging: {
      currentPage: 0,
      totalPage: 1,
      pageSize: 10,
    },
  }
);

export const widgetsSlice = createSlice({
  name: WIDGETS_FEATURE_KEY,
  initialState: initialWidgetsState,
  reducers: {
    add: WidgetsAdapter.addOne,
    remove: WidgetsAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWidgets.pending, (state: WidgetsState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchWidgets.fulfilled,
        (state: WidgetsState, action: PayloadAction<WidgetsResponse>) => {
          WidgetsAdapter.setAll(state, action.payload.widgets);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchWidgets.rejected, (state: WidgetsState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
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
export const widgetsActions = widgetsSlice.actions;
export const widgetsReducer = widgetsSlice.reducer;
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
const { selectAll, selectEntities } = WidgetsAdapter.getSelectors();

export const getWidgetsState = (rootState: RootState): WidgetsState =>
  rootState[WIDGETS_FEATURE_KEY];

export const selectAllWidgets = createSelector(getWidgetsState, selectAll);

export const selectWidgetsEntities = createSelector(
  getWidgetsState,
  selectEntities
);

export const getWidgetsLoadingStatus = createSelector(
  getWidgetsState,
  (state) => state.loadingStatus
);
