import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { DeviceEntity } from '../+state/devices/devices.models';
import {
  DEVICES_ENVIRONMENT,
  DevicesEnvironment,
} from '../features-devices.module';

enum KeywordAccessMode {
  noAccess,
  get,
  set,
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
  blacklisted,
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
  providedIn: 'root',
})
export class DevicesService {
  constructor(
    private http: HttpClient,
    @Inject(DEVICES_ENVIRONMENT)
    private environment: DevicesEnvironment
  ) {}

  // Get devices (filtered)
  // Can be called like (all parameters are optional) :
  // service.getDevices({
  //       fromPluginInstance: 2,
  //       containingKeywordWithCapacityName: ['temperature'],
  //       requestedProperties: [ DeviceProperty.id, DeviceProperty.pluginInstance, DeviceProperty.friendlyName, DeviceProperty.model ]
  //     })
  getDevices(
    getDeviceParameters: GetDeviceParameters
  ): Observable<DeviceEntity[]> {
    const queryParams = this.getQueryParams(getDeviceParameters);
    return this.http
      .get<{ devices: DeviceEntity[] }>(this.environment.devicesUrl, {
        params: queryParams,
      })
      .pipe(
        tap(console.debug),
        map((answer) => answer.devices)
      );
  }
  getDeviceById(id: number): Observable<DeviceEntity> {
    console.log(this.environment.devicesUrl);
    return this.http
      .get<{ device: DeviceEntity }>(`${this.environment.devicesUrl}/${id}`)
      .pipe(tap(console.debug));
  }

  private getQueryParams(getDeviceParameters: GetDeviceParameters) {
    let queryParams = new HttpParams();
    if (getDeviceParameters.fromPluginInstance)
      queryParams = queryParams.set(
        'fromPluginInstance',
        getDeviceParameters.fromPluginInstance
      );
    if (getDeviceParameters.fromFriendlyName)
      queryParams = queryParams.set(
        'fromFriendlyName',
        getDeviceParameters.fromFriendlyName
      );
    if (getDeviceParameters.fromType)
      queryParams = queryParams.set('fromType', getDeviceParameters.fromType);
    if (getDeviceParameters.fromModel)
      queryParams = queryParams.set('fromModel', getDeviceParameters.fromModel);
    if (getDeviceParameters.containingKeywordWithCapacityName)
      queryParams = queryParams.set(
        'containingKeywordWithCapacityName',
        getDeviceParameters.containingKeywordWithCapacityName.join('|')
      );
    if (getDeviceParameters.containingKeywordWithAccessMode)
      queryParams = queryParams.set(
        'containingKeywordWithAccessMode',
        getDeviceParameters.containingKeywordWithAccessMode
      );
    if (getDeviceParameters.containingKeywordWithCapacityType)
      queryParams = queryParams.set(
        'containingKeywordWithCapacityType',
        getDeviceParameters.containingKeywordWithCapacityType.join('|')
      );
    if (getDeviceParameters.containingKeywordWithHistoryDepth)
      queryParams = queryParams.set(
        'containingKeywordWithHistoryDepth',
        getDeviceParameters.containingKeywordWithHistoryDepth
      );
    if (getDeviceParameters.withBlacklisted)
      queryParams = queryParams.set(
        'withBlacklisted',
        getDeviceParameters.withBlacklisted
      );
    if (getDeviceParameters.page)
      queryParams = queryParams.set('page', getDeviceParameters.page);
    if (getDeviceParameters.perPage)
      queryParams = queryParams.set('perPage', getDeviceParameters.perPage);
    if (getDeviceParameters.requestedProperties)
      queryParams = queryParams.set(
        'prop',
        getDeviceParameters.requestedProperties
          .map((value) => DeviceProperty[value])
          .join('|')
      );
    return queryParams;
  }
}
