import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  PLUGINS_INSTANCES_FEATURE_KEY,
  pluginsInstancesReducer,
} from '@yadoms/plugins';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  reducer: { [PLUGINS_INSTANCES_FEATURE_KEY]: pluginsInstancesReducer },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
