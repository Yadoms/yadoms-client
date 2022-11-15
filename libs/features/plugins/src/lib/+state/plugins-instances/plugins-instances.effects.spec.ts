import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as PluginsInstancesActions from './plugins-instances.actions';
import { PluginsInstancesEffects } from './plugins-instances.effects';

describe('PluginsInstancesEffects', () => {
  let actions: Observable<Action>;
  let effects: PluginsInstancesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PluginsInstancesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(PluginsInstancesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
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
