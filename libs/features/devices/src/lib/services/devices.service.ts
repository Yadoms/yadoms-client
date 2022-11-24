import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { DeviceEntity } from '../+state/devices/devices.models';
import { DEVICES_ENVIRONMENT, DevicesEnvironment } from '../features-devices.module';

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

export enum DeviceProperty {
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
  fromPluginInstance?: number | null;
  fromFriendlyName?: string | null;
  fromType?: string | null;
  fromModel?: string | null;
  containingKeywordWithCapacityName?: string[] | null;
  containingKeywordWithAccessMode?: KeywordAccessMode | null;
  containingKeywordWithCapacityType?: KeywordDataType[] | null;
  containingKeywordWithHistoryDepth?: HistoryDepth | null;
  withBlacklisted?: boolean | null;
  page?: number | null;
  perPage?: number | null;
  requestedProperties?: DeviceProperty[] | null;
}

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(
    private http: HttpClient,
    @Inject(DEVICES_ENVIRONMENT)
    private environment: DevicesEnvironment) {
  }

  // Get devices (filtered)
  // Can be called like (all parameters are optional) :
  // service.getDevices({
  //       fromPluginInstance: 2,
  //       containingKeywordWithCapacityName: ['temperature'],
  //       requestedProperties: [ DeviceProperty.id, DeviceProperty.pluginInstance, DeviceProperty.friendlyName, DeviceProperty.model ]
  //     })
  getDevices({
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
               requestedProperties
             }: GetDeviceParameters ): Observable<DeviceEntity[]> {
    let queryParams = new HttpParams;
    if (fromPluginInstance) queryParams = queryParams.set('fromPluginInstance', fromPluginInstance);
    if (fromFriendlyName) queryParams = queryParams.set('fromFriendlyName', fromFriendlyName);
    if (fromType) queryParams = queryParams.set('fromType', fromType);
    if (fromModel) queryParams = queryParams.set('fromModel', fromModel);
    if (containingKeywordWithCapacityName) queryParams = queryParams.set('containingKeywordWithCapacityName', containingKeywordWithCapacityName.join('|'));
    if (containingKeywordWithAccessMode) queryParams = queryParams.set('containingKeywordWithAccessMode', containingKeywordWithAccessMode);
    if (containingKeywordWithCapacityType) queryParams = queryParams.set('containingKeywordWithCapacityType', containingKeywordWithCapacityType.join('|'));
    if (containingKeywordWithHistoryDepth) queryParams = queryParams.set('containingKeywordWithHistoryDepth', containingKeywordWithHistoryDepth);
    if (withBlacklisted) queryParams = queryParams.set('withBlacklisted', withBlacklisted);
    if (page) queryParams = queryParams.set('page', page);
    if (perPage) queryParams = queryParams.set('perPage', perPage);
    if (requestedProperties) queryParams = queryParams.set('prop', requestedProperties.map(value => DeviceProperty[value]).join('|'));

    console.log(this.environment.devicesUrl);
    return this.http
      .get<{ devices: DeviceEntity[] }>(this.environment.devicesUrl,
        { params: queryParams })
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
