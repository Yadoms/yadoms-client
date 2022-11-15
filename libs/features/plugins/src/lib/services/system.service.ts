import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import {
  PLUGINS_ENVIRONNEMENT,
  PluginsEnvironnement,
} from '../features-plugins.module';
import { PluginEntity, PluginInstanceEntity } from '../+state/plugins/plugins.models';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  constructor(
    private http: HttpClient,
    @Inject(PLUGINS_ENVIRONNEMENT)
    private environnement: PluginsEnvironnement
  ) {}

  getPlugins(): Observable<PluginEntity[]> {
    console.log(this.environnement.pluginsUrl);
    return this.http
      .get<{ plugins: PluginEntity[] }>(this.environnement.pluginsUrl)
      .pipe(
        tap(console.debug),
        map((answer) => answer.plugins)
      );
  }

  getPluginsInstances(): Observable<PluginInstanceEntity[]> {
    console.log(this.environnement.pluginsInstancesUrl);
    return this.http
      .get<{ instances: PluginInstanceEntity[] }>(this.environnement.pluginsInstancesUrl)
      .pipe(
        tap(console.debug),
        map((answer) => answer.instances)
      );
  }
}
