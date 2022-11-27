import { Component, OnInit } from '@angular/core';
import { PluginInstanceEntity } from '../../+state/plugins-instances/plugins-instances.models';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as PluginsInstancesSelectors from '../../+state/plugins-instances/plugins-instances.selectors';
import * as PluginsInstancesActions from '../../+state/plugins-instances/plugins-instances.actions';

@Component({
  selector: 'yadoms-plugins-page',
  templateUrl: './plugins-page.component.html',
  styleUrls: ['./plugins-page.component.scss'],
})
export class PluginsPageComponent implements OnInit {
  pluginsInstances$: Observable<PluginInstanceEntity[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(PluginsInstancesActions.initPluginsInstances());
    this.pluginsInstances$ = this.store.select(
      PluginsInstancesSelectors.getAllPluginsInstances
    );
  }
}
