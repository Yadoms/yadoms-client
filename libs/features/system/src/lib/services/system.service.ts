import { Inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  SYSTEM_ENVIRONMENT,
  SystemEnvironment,
} from '../features-system.module';
import { SystemInformationEntity } from '../+state/system/system.models';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  constructor(
    private http: HttpClient,
    @Inject(SYSTEM_ENVIRONMENT)
    private environment: SystemEnvironment
  ) {}

  getInformation(): Observable<SystemInformationEntity> {
    console.log(this.environment.informationUrl);
    return this.http
      .get<{ information: SystemInformationEntity }>(
        this.environment.informationUrl
      )
      .pipe(tap(console.debug));
  }
}
