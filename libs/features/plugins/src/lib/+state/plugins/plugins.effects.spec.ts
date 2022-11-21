import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as PluginActions from './plugins.actions';
import { PluginsEffects } from './plugins.effects';
import { HttpClientModule } from '@angular/common/http';
import { PLUGINS_ENVIRONNEMENT } from '../../features-plugins.module';
import { PluginService } from '../../services/plugin.service';

describe('PluginsEffects', () => {
  let actions: Observable<Action>;
  let effects: PluginsEffects;
  let pluginService: PluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        PluginsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: PLUGINS_ENVIRONNEMENT,
          useValue: '',
        },
        {
          provide: PluginService,
          useValue: {
            getPlugins: jest.fn(),
          },
        },
      ],
    });
    pluginService = TestBed.inject(PluginService);
    effects = TestBed.inject(PluginsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      jest.spyOn(pluginService, 'getAll').mockImplementation(() => of([]));

      actions = hot('-a-|', { a: PluginActions.initPlugins() });

      const expected = hot('-a-|', {
        a: PluginActions.loadPluginsSuccess({ plugins: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
