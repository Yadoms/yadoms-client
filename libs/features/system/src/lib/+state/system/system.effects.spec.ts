import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as SystemActions from './system.actions';
import { SystemEffects } from './system.effects';

describe('SystemEffects', () => {
  let actions: Observable<Action>;
  let effects: SystemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SystemEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(SystemEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SystemActions.initSystem() });

      const expected = hot('-a-|', {
        a: SystemActions.loadSystemSuccess({ system: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
