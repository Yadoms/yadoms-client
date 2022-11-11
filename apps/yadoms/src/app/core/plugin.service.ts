import { Injectable } from '@angular/core';
import { RestServerService } from './restserver.service';
import { AvailablePlugins, PluginCategory } from './models/available-plugin';
import {
  PluginInstance,
  PluginInstances,
  PluginInstancesWithState,
  PluginInstanceWithState,
} from './models/pluginInstances';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PluginService {
  constructor(private restServerService: RestServerService) {}

  public getAvailablePluginsInformation(
    fields: string[] | undefined
  ): Promise<AvailablePlugins> {
    //TODO l'envoi d'un PUT est reçu en tant qu'OPTIONS par le serveur
    return this.restServerService.get<AvailablePlugins>('plugins', {
      fields: fields,
    });
  }

  public getAllPluginsInstance(): Promise<PluginInstances> {
    return new Promise<PluginInstances>((resolve) => {
      this.restServerService
        .get<PluginInstance[]>('plugin/instance')
        .then((data) => {
          const pi = new PluginInstances();
          pi.plugins = data;
          resolve(pi);
        });
    });
  }

  public getAllPluginsInstanceWithState(): Promise<PluginInstancesWithState> {
    return new Promise<PluginInstancesWithState>((resolve) => {
      this.restServerService
        .get<PluginInstanceWithState[]>('plugins-instances')
        .then((data) => {
          debugger;
          const pi = new PluginInstancesWithState();
          pi.instances = data as PluginInstanceWithState[];
          resolve(pi);
        });
    });
  }

  public startStop(pi: PluginInstance, start: boolean): Promise<void> {
    if (pi.Category === PluginCategory.System) {
      return Promise.resolve();
    }
    return this.restServerService.put(
      'plugin/' + pi.Id + (start ? '/start' : '/stop')
    );
  }
}
