import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  SYSTEM_ENVIRONNEMENT,
  SystemEnvironnement,
} from '../features-system.module';
import { SystemInformationEntity } from '../+state/system/system.models';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private http: HttpClient,
    @Inject(SYSTEM_ENVIRONNEMENT)
    private environnement: SystemEnvironnement) { }

    getInformation(): Observable<SystemInformationEntity> {
      console.log(this.environnement.informationUrl);
      return this.http
        .get<{ information: SystemInformationEntity }>(this.environnement.informationUrl)
        .pipe(
          tap(console.debug)
        );
    }
}
