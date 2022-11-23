import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as PluginsInstancesActions from './plugins-instances.actions';
import { PluginsInstancesEffects } from './plugins-instances.effects';
import { HttpClientModule } from '@angular/common/http';
import { PLUGINS_ENVIRONMENT } from '../../features-plugins.module';
import { PluginsService } from '../../services/plugins.service';

describe('PluginsInstancesEffects', () => {
  let actions: Observable<Action>;
  let effects: PluginsInstancesEffects;
  let pluginService: PluginsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        PluginsInstancesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: PLUGINS_ENVIRONMENT,
          useValue: '',
        },
        {
          provide: PluginsService,
          useValue: {
            getPluginsInstances: jest.fn(),
            getAllInstances: jest.fn(),
          },
        },
      ],
    });
    pluginService = TestBed.inject(PluginsService);
    effects = TestBed.inject(PluginsInstancesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      jest
        .spyOn(pluginService, 'getAllInstances')
        .mockImplementation(() => of([]));

      actions = hot('-a-|', {
        a: PluginsInstancesActions.initPluginsInstances(),
      });

      const expected = hot('-a-|', {
        a: PluginsInstancesActions.loadPluginsInstancesSuccess({
          pluginsInstances: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
