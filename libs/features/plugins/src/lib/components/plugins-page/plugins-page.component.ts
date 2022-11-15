import { Component, OnInit } from '@angular/core';
import { PluginEntity } from '../../+state/plugins/plugins.models';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as PluginsSelectors from '../../+state/plugins/plugins.selectors';
import * as PluginsActions from '../../+state/plugins/plugins.actions';

@Component({
  selector: 'yadoms-plugins-page',
  templateUrl: './plugins-page.component.html',
  styleUrls: ['./plugins-page.component.scss'],
})
export class PluginsPageComponent implements OnInit {
  plugins$: Observable<PluginEntity[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(PluginsActions.initPlugins());
    this.plugins$ = this.store.select(PluginsSelectors.getAllPlugins);
  }
}
