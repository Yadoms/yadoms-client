import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as InformationActions from './information.actions';
import { InformationEffects } from './information.effects';

describe('InformationEffects', () => {
  let actions: Observable<Action>;
  let effects: InformationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        InformationEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(InformationEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: InformationActions.initInformation() });

      const expected = hot('-a-|', {
        a: InformationActions.loadInformationSuccess({ information: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
