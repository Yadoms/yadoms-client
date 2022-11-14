import { createAction, props } from '@ngrx/store';
import { PluginEntity } from './plugin.models';

export const initPlugins = createAction('[Plugin Page] Init');

export const loadPluginsSuccess = createAction(
  '[Plugins/API] Load Plugins Success',
  props<{ plugins: PluginEntity[] }>()
);

export const loadPluginsFailure = createAction(
  '[Plugins/API] Load Plugins Failure',
  props<{ error: any }>()
);
