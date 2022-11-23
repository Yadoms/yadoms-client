import { inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as SystemActions from './system.actions';
import { SystemService } from '../../services/system.service';
import { map } from 'rxjs';

@Injectable()
export class SystemEffects {
  private systemService = inject(SystemService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SystemActions.initSystem),
      fetch({
        run: (action) => {
          return this.systemService
            .getInformation()
            .pipe(
              map((information) =>
                SystemActions.loadSystemInformationSuccess({ information })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SystemActions.loadSystemInformationFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
