import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { loadAvailablePlugins } from '../api/plugins-api';
import { AvailablePluginsResponse } from '../model/AvailablePluginsResponse';
export const AVAILABLE_PLUGINS_FEATURE_KEY = 'availablePlugins';

interface Locales {
  description: string;
  name: string;
  customLabels: any;
  configurationSchema: any;
  deviceConfiguration: any;
}

interface Package {
  type: string;
  version: string;
  author: string;
  url: string;
  credits: string;
  supportedPlatforms: string;
  supportManuallyDeviceCreation: boolean;
  supportDeviceRemovedNotification: boolean;
  configurationSchema: any;
}
export interface AvailablePluginsEntity {
  type: string;
  version: string;
  author: string;
  url: string;
  supportManuallyCreatedDevice: boolean;
  supportDeviceRemovedNotification: boolean;
  locales: Locales;
  package: Package;
}

export interface AvailablePluginsState
  extends EntityState<AvailablePluginsEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const availablePluginsAdapter =
  createEntityAdapter<AvailablePluginsEntity>({
    selectId: (availablePlugins) => availablePlugins.type,
  });

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
 *   dispatch(fetchAvailablePlugins())
 * }, [dispatch]);
 * ```
 */
export const fetchAvailablePlugins = createAsyncThunk(
  'availablePlugins/fetchStatus',
  async (_, thunkAPI) => {
    try {
      return await loadAvailablePlugins();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const initialAvailablePluginsState: AvailablePluginsState =
  availablePluginsAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const availablePluginsSlice = createSlice({
  name: AVAILABLE_PLUGINS_FEATURE_KEY,
  initialState: initialAvailablePluginsState,
  reducers: {
    add: availablePluginsAdapter.addOne,
    remove: availablePluginsAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAvailablePlugins.pending,
        (state: AvailablePluginsState) => {
          state.loadingStatus = 'loading';
        }
      )
      .addCase(
        fetchAvailablePlugins.fulfilled,
        (
          state: AvailablePluginsState,
          action: PayloadAction<AvailablePluginsResponse>
        ) => {
          availablePluginsAdapter.setAll(state, action.payload.plugins);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchAvailablePlugins.rejected,
        (state: AvailablePluginsState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message;
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const availablePluginsReducer = availablePluginsSlice.reducer;

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
 *   dispatch(availablePluginsActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const availablePluginsActions = availablePluginsSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllAvailablePlugins);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities, selectById } =
  availablePluginsAdapter.getSelectors();

export const getAvailablePluginsState = (
  rootState: unknown
): AvailablePluginsState => rootState[AVAILABLE_PLUGINS_FEATURE_KEY];

export const selectAllAvailablePlugins = createSelector(
  getAvailablePluginsState,
  selectAll
);

export const selectAvailablePluginsEntities = createSelector(
  getAvailablePluginsState,
  selectEntities
);

export const selectAvailablePluginsLoading = createSelector(
  getAvailablePluginsState,
  (state) => state.loadingStatus === 'loading'
);

export const selectAvailablePluginEntityByType = (pluginType: string) => {
  return createSelector(getAvailablePluginsState, (state) =>
    selectById(state, pluginType)
  );
};

export const getAvailablePluginConfigurationSchema = (pluginType: string) => {
  return createSelector(
    selectAvailablePluginEntityByType(pluginType),
    (availablePluginEntity) => {
      const mergedConfigSchema = {
        ...availablePluginEntity?.package.configurationSchema,
      };

      if (availablePluginEntity?.locales.configurationSchema) {
        Object.keys(availablePluginEntity.locales.configurationSchema).forEach(
          (key) => {
            if (mergedConfigSchema[key]) {
              mergedConfigSchema[key] = {
                ...mergedConfigSchema[key],
                ...availablePluginEntity.locales.configurationSchema[key],
              };
            }
          }
        );
      }

      return mergedConfigSchema;
    }
  );
};
