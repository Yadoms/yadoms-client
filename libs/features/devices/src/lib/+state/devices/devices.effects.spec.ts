import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as DevicesActions from './devices.actions';
import { DevicesEffects } from './devices.effects';
import { DevicesService } from '../../services/devices.service';
import { HttpClientModule } from '@angular/common/http';
import { DEVICES_ENVIRONMENT } from '../../features-devices.module';

describe('DevicesEffects', () => {
  let actions: Observable<Action>;
  let effects: DevicesEffects;
  let devicesService: DevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        DevicesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: DEVICES_ENVIRONMENT,
          useValue: ''
        },
        {
          provide: DevicesService,
          useValue: {
            getDevices: jest.fn()
          }
        }
      ]
    });

    devicesService = TestBed.inject(DevicesService);
    effects = TestBed.inject(DevicesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      jest.spyOn(devicesService, 'getDevices').mockImplementation(() => of([]));

      actions = hot('-a-|', { a: DevicesActions.initDevices() });

      const expected = hot('-a-|', {
        a: DevicesActions.loadDevicesSuccess({ devices: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
