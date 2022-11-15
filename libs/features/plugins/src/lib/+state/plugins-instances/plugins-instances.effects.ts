import { inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as PluginsInstancesActions from './plugins-instances.actions';
import { SystemService } from '../../services/system.service';
import { map } from 'rxjs';

@Injectable()
export class PluginsInstancesEffects {
  private systemService = inject(SystemService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PluginsInstancesActions.initPluginsInstances),
      fetch({
        run: (action) => {
          return this.systemService
            .getPluginsInstances()
            .pipe(
              map((pluginsInstances) => PluginsInstancesActions.loadPluginsInstancesSuccess({ pluginsInstances }))
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return PluginsInstancesActions.loadPluginsInstancesFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
