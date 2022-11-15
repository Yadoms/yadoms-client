import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginsPageComponent } from './components/plugins-page/plugins-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPlugin from './+state/plugins/plugin.reducer';
import { PluginEffects } from './+state/plugins/plugin.effects';
import { HttpClientModule } from '@angular/common/http';

export interface PluginsEnvironnement {
  production: boolean
  pluginsUrl: string
}

export const PLUGINS_ENVIRONNEMENT = new InjectionToken<PluginsEnvironnement>(
  'PLUGINS_ENVIRONNEMENT'
);

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    StoreModule.forFeature(
      fromPlugin.PLUGIN_FEATURE_KEY,
      fromPlugin.pluginReducer
    ),
    EffectsModule.forFeature([PluginEffects]),
  ],
  declarations: [PluginsPageComponent],
})
export class FeaturesPluginsModule {
  static forRoot(
    environnement: PluginsEnvironnement
  ): ModuleWithProviders<FeaturesPluginsModule> {
    return {
      ngModule: FeaturesPluginsModule,
      providers: [{ provide: PLUGINS_ENVIRONNEMENT, useValue: environnement }],
    };
  }
}
