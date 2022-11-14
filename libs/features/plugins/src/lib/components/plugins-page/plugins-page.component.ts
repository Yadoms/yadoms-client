import { Component, inject, OnInit } from '@angular/core';
import { SystemInformationEntity } from '../../+state/system/information/information.models';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as InformationSelectors from '../../+state/system/information/information.selectors';
import * as InformationActions from '../../+state/system/information/information.actions';

@Component({
  selector: 'yadoms-plugins-page',
  templateUrl: './plugins-page.component.html',
  styleUrls: ['./plugins-page.component.scss'],
})
export class PluginsPageComponent implements OnInit {
  systemInformation$: Observable<SystemInformationEntity[]> = of([]);
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(InformationActions.initInformation());
    this.systemInformation$ = this.store.select(
      InformationSelectors.getAllInformation
    );
  }
}
