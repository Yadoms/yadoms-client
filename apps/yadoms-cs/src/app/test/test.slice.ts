import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const TEST_FEATURE_KEY = 'test';

/*
 * Update these interfaces according to your requirements.
 */
export interface TestEntity {
  id: number;
}

export interface TestState extends EntityState<TestEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const testAdapter = createEntityAdapter<TestEntity>();

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
 *   dispatch(fetchTest())
 * }, [dispatch]);
 * ```
 */
export const fetchTest = createAsyncThunk(
  'test/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getTests()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialTestState: TestState = testAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const testSlice = createSlice({
  name: TEST_FEATURE_KEY,
  initialState: initialTestState,
  reducers: {
    add: testAdapter.addOne,
    remove: testAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTest.pending, (state: TestState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchTest.fulfilled,
        (state: TestState, action: PayloadAction<TestEntity[]>) => {
          testAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchTest.rejected, (state: TestState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const testReducer = testSlice.reducer;

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
 *   dispatch(testActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const testActions = testSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllTest);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = testAdapter.getSelectors();

export const getTestState = (rootState: unknown): TestState =>
  rootState[TEST_FEATURE_KEY];

export const selectAllTest = createSelector(getTestState, selectAll);

export const selectTestEntities = createSelector(getTestState, selectEntities);
