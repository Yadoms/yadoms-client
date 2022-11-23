import { inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as DevicesActions from './devices.actions';
import { DevicesService } from '../../services/devices.service';
import { map } from 'rxjs';

@Injectable()
export class DevicesEffects {
  private devicesService = inject(DevicesService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DevicesActions.initDevices),
      fetch({
        run: (action) => {
          return this.devicesService
            .getDevices({
              fromPluginInstance: 1
            })
            .pipe(
              map((devices) => DevicesActions.loadDevicesSuccess({ devices }))
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return DevicesActions.loadDevicesFailure({ error });
        }
      })
    )
  );

  constructor(private readonly actions$: Actions) {
  }
}
