import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PLUGINS_ENVIRONNEMENT, PluginsEnvironnement } from "../features-plugins.module";
import { PluginEntity } from '../+state/plugins/plugin.models';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private http: HttpClient,
    @Inject(PLUGINS_ENVIRONNEMENT)
    private environnement: PluginsEnvironnement
  ) { }

  getPlugins(): Observable<PluginEntity[]> {
    return this.http.get<PluginEntity[]>(this.environnement.pluginsUrl);
  }
}
