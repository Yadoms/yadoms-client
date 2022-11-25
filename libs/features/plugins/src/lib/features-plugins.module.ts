import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginsPageComponent } from './components/plugins-page/plugins-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPlugin from './+state/plugins/plugins.reducer';
import { PluginsEffects } from './+state/plugins/plugins.effects';
import { HttpClientModule } from '@angular/common/http';
import * as fromPluginsInstances from './+state/plugins-instances/plugins-instances.reducer';
import { PluginsInstancesEffects } from './+state/plugins-instances/plugins-instances.effects';

export interface PluginsEnvironment {
  production: boolean;
  pluginsUrl: string;
  pluginsInstancesUrl: string;
}

export const PLUGINS_ENVIRONMENT = new InjectionToken<PluginsEnvironment>(
  'PLUGINS_ENVIRONMENT'
);

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    StoreModule.forFeature(
      fromPlugin.PLUGIN_FEATURE_KEY,
      fromPlugin.pluginsReducer
    ),
    EffectsModule.forFeature([PluginsEffects]),
    StoreModule.forFeature(
      fromPluginsInstances.PLUGINS_INSTANCES_FEATURE_KEY,
      fromPluginsInstances.pluginsInstancesReducer
    ),
    EffectsModule.forFeature([PluginsInstancesEffects]),
  ],
  declarations: [PluginsPageComponent],
})
export class FeaturesPluginsModule {
  static forRoot(
    environment: PluginsEnvironment
  ): ModuleWithProviders<FeaturesPluginsModule> {
    return {
      ngModule: FeaturesPluginsModule,
      providers: [{ provide: PLUGINS_ENVIRONMENT, useValue: environment }],
    };
  }
}
