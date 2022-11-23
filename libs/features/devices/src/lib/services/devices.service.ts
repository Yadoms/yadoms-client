import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { DeviceEntity } from '../+state/devices/devices.models';
import { DEVICES_ENVIRONMENT, DevicesEnvironment } from '../features-devices.module';
import { Router, UrlSerializer } from '@angular/router';

enum KeywordAccessMode {
  noAccess,
  get,
  set
}

enum KeywordDataType {
  noData,
  string,
  numeric,
  bool,
  json,
  enum,
  dateTime,
}

enum HistoryDepth {
  default,
  noHistory,
}

enum DeviceProperty {
  id,
  pluginInstance,
  name,
  friendlyName,
  model,
  details,
  configuration,
  type,
  blacklisted
}

interface GetDeviceParameters {
  fromPluginInstance?: number;
  fromFriendlyName?: string;
  fromType?: string;
  fromModel?: string;
  containingKeywordWithCapacityName?: string[];
  containingKeywordWithAccessMode?: KeywordAccessMode;
  containingKeywordWithCapacityType?: KeywordDataType[];
  containingKeywordWithHistoryDepth?: HistoryDepth;
  withBlacklisted?: boolean;
  page?: number;
  perPage?: number;
  requestedProperties?: DeviceProperty[];
}

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private urlSerializer: UrlSerializer,
    @Inject(DEVICES_ENVIRONMENT)
    private environment: DevicesEnvironment) {
  }


  getDevices({
               fromPluginInstance = undefined,
               fromFriendlyName = undefined,
               fromType = undefined,
               fromModel = undefined,
               containingKeywordWithCapacityName = undefined,
               containingKeywordWithAccessMode = undefined,
               containingKeywordWithCapacityType = undefined,
               containingKeywordWithHistoryDepth = undefined,
               withBlacklisted = undefined,
               page = undefined,
               perPage = undefined,
               requestedProperties = undefined
             }: GetDeviceParameters): Observable<DeviceEntity[]> {
    const url = this.urlSerializer.serialize(this.router.createUrlTree([], { // TODO l'url de base retourné par router n'est pas bonne, il faut utiliser this.environment.devicesUrl
      queryParams: {
        fromPluginInstance,
        fromFriendlyName,
        fromType,
        fromModel,
        containingKeywordWithCapacityName,
        containingKeywordWithAccessMode,
        containingKeywordWithCapacityType,
        containingKeywordWithHistoryDepth,
        withBlacklisted,
        page,
        perPage,
        prop: requestedProperties
      }
    }));
    console.log(url);
    return this.http
      .get<{ devices: DeviceEntity[] }>(url)
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
