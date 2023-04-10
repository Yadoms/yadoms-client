import { configureStore } from '@reduxjs/toolkit';
import {
  AVAILABLE_PLUGINS_FEATURE_KEY,
  availablePluginsReducer,
  PLUGINS_INSTANCES_FEATURE_KEY,
  pluginsInstancesReducer,
} from '@yadoms/domain/plugins';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    [AVAILABLE_PLUGINS_FEATURE_KEY]: availablePluginsReducer,
    [PLUGINS_INSTANCES_FEATURE_KEY]: pluginsInstancesReducer,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
