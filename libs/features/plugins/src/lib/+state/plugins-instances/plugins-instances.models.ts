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
