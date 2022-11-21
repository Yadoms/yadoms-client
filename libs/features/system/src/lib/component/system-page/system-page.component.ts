import { Component, OnInit } from '@angular/core';
import { SystemInformationEntity } from '../../+state/system/system.models';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SystemSelectors from '../../+state/system/system.selectors';
import * as SystemActions from '../../+state/system/system.actions';

@Component({
  selector: 'yadoms-system-page',
  templateUrl: './system-page.component.html',
  styleUrls: ['./system-page.component.scss'],
})
export class SystemPageComponent implements OnInit {
  information$: Observable<SystemInformationEntity[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(SystemActions.initSystem());
    this.information$ = this.store.select(
      SystemSelectors.getAllSystem
    );
  }
}
