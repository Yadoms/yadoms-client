import { Inject, Injectable } from '@angular/core';
import { PLUGINS_ENVIRONNEMENT, PluginsEnvironnement } from '@yadoms/features/plugins';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemInformationEntity } from '../+state/system/system-information.models';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private http: HttpClient,
    @Inject(PLUGINS_ENVIRONNEMENT)
    private environnement: PluginsEnvironnement
  ) { }

  getInformation(): Observable<SystemInformationEntity> {
    return this.http.get<SystemInformationEntity>(this.environnement.systemInformationUrl);
  }
}
