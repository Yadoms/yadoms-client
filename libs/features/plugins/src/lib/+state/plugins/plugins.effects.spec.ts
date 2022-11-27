import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as PluginActions from './plugins.actions';
import { PluginsEffects } from './plugins.effects';
import { HttpClientModule } from '@angular/common/http';
import { PLUGINS_ENVIRONMENT } from '../../features-plugins.module';
import { PluginsService } from '../../services/plugins.service';

describe('PluginsEffects', () => {
  let actions: Observable<Action>;
  let effects: PluginsEffects;
  let pluginsService: PluginsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        PluginsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: PLUGINS_ENVIRONMENT,
          useValue: '',
        },
        {
          provide: PluginsService,
          useValue: {
            getAll: jest.fn(),
          },
        },
      ],
    });
    pluginsService = TestBed.inject(PluginsService);
    effects = TestBed.inject(PluginsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      jest.spyOn(pluginsService, 'getAll').mockImplementation(() => of([]));

      actions = hot('-a-|', { a: PluginActions.initPlugins() });

      const expected = hot('-a-|', {
        a: PluginActions.loadPluginsSuccess({ plugins: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
