import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PluginsInstancesActions from './plugins-instances.actions';
import { PluginInstanceEntity } from './plugins-instances.models';

export const PLUGINS_INSTANCES_FEATURE_KEY = 'pluginsInstances';

export interface PluginsInstancesState
  extends EntityState<PluginInstanceEntity> {
  selectedId?: string | number; // which PluginsInstances record has been selected
  loaded: boolean; // has the PluginsInstances list been loaded
  error?: string | null; // last known error (if any)
}

export interface PluginsInstancesPartialState {
  readonly [PLUGINS_INSTANCES_FEATURE_KEY]: PluginsInstancesState;
}

export const pluginsInstancesAdapter: EntityAdapter<PluginInstanceEntity> =
  createEntityAdapter<PluginInstanceEntity>();

export const initialPluginsInstancesState: PluginsInstancesState =
  pluginsInstancesAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialPluginsInstancesState,
  on(PluginsInstancesActions.initPluginsInstances, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    PluginsInstancesActions.loadPluginsInstancesSuccess,
    (state, { pluginsInstances }) =>
      pluginsInstancesAdapter.setAll(pluginsInstances, {
        ...state,
        loaded: true,
      })
  ),
  on(
    PluginsInstancesActions.loadPluginsInstancesFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function pluginsInstancesReducer(
  state: PluginsInstancesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
