export enum PluginCategory {
  System = 0,
  User = 1,
}

export class AvailablePlugin {
  public type: string = '';
  public author: string = '';
  public url: string = '';
}

export class AvailablePlugins {
  public plugins: AvailablePlugin[] = [];
}
