/**
 * Interface for the 'Devices' data
 */
export interface DeviceEntity {
  id: number; // Primary ID
  pluginInstance:number;
  friendlyName: string;
  details: object;
  configuration: object;
  type: string;
  blacklisted: boolean;
}
