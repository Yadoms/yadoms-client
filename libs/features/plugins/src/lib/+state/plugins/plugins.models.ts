
export interface PluginEntity {
  type: string;
  version: string;
  author: string;
  url: string;
  supportManuallyCreatedDevice: boolean;
  supportDeviceRemovedNotification: boolean;
  package: object;
}

export interface PluginInstanceState {

  state: string;
  messageId: string;
  messageData: string;
}

export interface PluginInstanceEntity {

  id: string;
  displayName: string;
  type: string;
  configuration: object;
  autoStart: boolean;
  category: string;
  state: string;
  fullState: PluginInstanceState;
}
