import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import {
  PLUGINS_ENVIRONMENT,
  PluginsEnvironment,
} from '../features-plugins.module';
import { PluginEntity } from '../+state/plugins/plugins.models';
import { PluginInstanceEntity } from '../+state/plugins-instances/plugins-instances.models';

@Injectable({
  providedIn: 'root',
})
export class PluginsService {
  constructor(
    private http: HttpClient,
    @Inject(PLUGINS_ENVIRONMENT)
    private environment: PluginsEnvironment
  ) {}

  getAll(): Observable<PluginEntity[]> {
    console.log(this.environment.pluginsUrl);
    return this.http
      .get<{ plugins: PluginEntity[] }>(this.environment.pluginsUrl)
      .pipe(
        tap(console.debug),
        map((answer) => answer.plugins)
      );
  }

  getAllInstances(): Observable<PluginInstanceEntity[]> {
    console.log(this.environment.pluginsInstancesUrl);
    return this.http
      .get<{ instances: PluginInstanceEntity[] }>(
        this.environment.pluginsInstancesUrl
      )
      .pipe(
        tap(console.debug),
        map((answer) => answer.instances)
      );
  }
}
