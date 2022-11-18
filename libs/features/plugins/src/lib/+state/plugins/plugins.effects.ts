import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as PluginActions from './plugins.actions';
import { PluginService } from '../../services/plugin.service';
import { map } from 'rxjs';

@Injectable()
export class PluginsEffects {
  private pluginService = inject(PluginService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PluginActions.initPlugins),
      fetch({
        run: (actions) => {
          return this.pluginService
            .getAll()
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
