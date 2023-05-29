import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AVAILABLE_PLUGINS_FEATURE_KEY,
  availablePluginsReducer,
  PLUGIN_FORM_FEATURE_KEY,
  pluginFormReducer,
  PLUGINS_INSTANCES_FEATURE_KEY,
  pluginsInstancesReducer,
} from '@yadoms/domain/plugins';

export const store = configureStore({
  reducer: {
    [AVAILABLE_PLUGINS_FEATURE_KEY]: availablePluginsReducer,
    [PLUGINS_INSTANCES_FEATURE_KEY]: pluginsInstancesReducer,
    [PLUGIN_FORM_FEATURE_KEY]: pluginFormReducer,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
