import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import {
  PLUGINS_ENVIRONNEMENT,
  PluginsEnvironnement,
} from '../features-plugins.module';
import { PluginEntity } from '../+state/plugins/plugins.models';
import { PluginInstanceEntity } from '../+state/plugins-instances/plugins-instances.models';

@Injectable({
  providedIn: 'root',
})
export class PluginService {
  constructor(
    private http: HttpClient,
    @Inject(PLUGINS_ENVIRONNEMENT)
    private environnement: PluginsEnvironnement
  ) {}

  getAll(): Observable<PluginEntity[]> {
    console.log(this.environnement.pluginsUrl);
    return this.http
      .get<{ plugins: PluginEntity[] }>(this.environnement.pluginsUrl)
      .pipe(
        tap(console.debug),
        map((answer) => answer.plugins)
      );
  }

  getAllInstances(): Observable<PluginInstanceEntity[]> {
    console.log(this.environnement.pluginsInstancesUrl);
    return this.http
      .get<{ instances: PluginInstanceEntity[] }>(
        this.environnement.pluginsInstancesUrl
      )
      .pipe(
        tap(console.debug),
        map((answer) => answer.instances)
      );
  }
}
