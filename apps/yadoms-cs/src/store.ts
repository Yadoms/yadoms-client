import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { pluginsInstancesReducer } from '@yadoms/plugins';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  pluginInstances: pluginsInstancesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});
