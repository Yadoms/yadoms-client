import { createAction, props } from '@ngrx/store';
import { PluginInstanceEntity } from './plugins-instances.models';

export const initPluginsInstances = createAction(
  '[PluginsInstances Page] Init'
);

export const loadPluginsInstancesSuccess = createAction(
  '[PluginsInstances/API] Load PluginsInstances Success',
  props<{ pluginsInstances: PluginInstanceEntity[] }>()
);

export const loadPluginsInstancesFailure = createAction(
  '[PluginsInstances/API] Load PluginsInstances Failure',
  props<{ error: any }>()
);
