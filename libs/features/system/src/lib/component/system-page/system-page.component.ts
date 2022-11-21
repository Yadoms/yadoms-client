import { Component, OnInit } from '@angular/core';
import { SystemInformationEntity } from '../../+state/system/system.models';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SystemActions from '../../+state/system/system.actions';

@Component({
  selector: 'yadoms-system-page',
  templateUrl: './system-page.component.html',
  styleUrls: ['./system-page.component.scss'],
})
export class SystemPageComponent implements OnInit {
  information$: Observable<SystemInformationEntity> = of();

  constructor(private store: Store<{ information: SystemInformationEntity }>) {
  }

  ngOnInit(): void {
    this.information$ = this.store.select('information');
    this.store.dispatch(SystemActions.initSystem());
  }
}
