import { inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as PluginActions from './plugins.actions';
import { SystemService } from '../../services/system.service';
import { map } from 'rxjs';

@Injectable()
export class PluginsEffects {
  private systemService = inject(SystemService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PluginActions.initPlugins),
      fetch({
        run: (action) => {
          return this.systemService
            .getPlugins()
            .pipe(
              map((plugins) => PluginActions.loadPluginsSuccess({ plugins }))
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return PluginActions.loadPluginsFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
