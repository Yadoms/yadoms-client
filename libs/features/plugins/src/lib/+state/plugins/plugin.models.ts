/**
 * Interface for the 'plugin' data
 */
export interface PluginEntity {
  type: string;
  version: string;
  author: string;
  url: string;
  supportManuallyCreatedDevice: boolean,
  supportDeviceRemovedNotification: boolean,
  package: object
}
