import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as PluginActions from './plugins.actions';
import { PluginsEffects } from './plugins.effects';

describe('PluginsEffects', () => {
  let actions: Observable<Action>;
  let effects: PluginsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PluginsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(PluginsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PluginActions.initPlugins() });

      const expected = hot('-a-|', {
        a: PluginActions.loadPluginsSuccess({ plugins: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
