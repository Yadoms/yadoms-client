import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as InformationActions from './information.actions';
import * as InformationFeature from './information.reducer';
import { SystemService } from '../../../services/system.service';
import { map } from 'rxjs';

@Injectable()
export class InformationEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InformationActions.initInformation),
      fetch({
        run: (action) => {
          return this.systemService.getInformation()
            .pipe(
              map(information => InformationActions.loadInformationSuccess({ information }))
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return InformationActions.loadInformationFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions, private systemService: SystemService) {}
}
