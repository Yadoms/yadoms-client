import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import {Observable, of} from 'rxjs';

import * as SystemActions from './system.actions';
import { SystemEffects } from './system.effects';
import {HttpClientModule} from "@angular/common/http";
import {SYSTEM_ENVIRONNEMENT} from '../../features-system.module';
import { SystemService } from '../../services/system.service';

describe('SystemEffects', () => {
  let actions: Observable<Action>;
  let effects: SystemEffects;
  let systemService: SystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        SystemEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: SYSTEM_ENVIRONNEMENT,
          useValue: '',
        },
      ],
    });

    systemService = TestBed.inject(SystemService);
    effects = TestBed.inject(SystemEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      jest.spyOn(systemService, 'getInformation').mockImplementation(() => of());

      actions = hot('-a-|', { a: SystemActions.initSystem() });

      const expected = hot('-a-|', {
        a: SystemActions.loadSystemInformationSuccess({
          information: {
            platform: '',
            platformFamily: '',
            yadomsVersion: '',
            startupTime: new Date,
            executablePath:'',
            serverReady: false,
            database: {
                version: '',
                size: 0,
            },
            databaseEngine: {
                type: '',
                version:'',
            },
            backupSupported: false,
            developerMode:  false
          }
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
