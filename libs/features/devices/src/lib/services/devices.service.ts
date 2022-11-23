import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {DeviceEntity} from '../+state/devices/devices.models';
import {DEVICES_ENVIRONMENT, DevicesEnvironment} from '../features-devices.module';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(
    private http: HttpClient,
    @Inject(DEVICES_ENVIRONMENT)
    private environment: DevicesEnvironment) {
  }

  getDevices(): Observable<DeviceEntity[]> {
    console.log(this.environment.devicesUrl);
    return this.http
      .get<{ devices: DeviceEntity[] }>(this.environment.devicesUrl)
      .pipe(
        tap(console.debug),
        map((answer) => answer.devices)
      );
  }

  getDevice(id: number): Observable<DeviceEntity> {
    console.log(this.environment.devicesUrl);
    return this.http
      .get<{ device: DeviceEntity }>(`${this.environment.devicesUrl}/${id}`)
      .pipe(
        tap(console.debug)
      );
  }
}
