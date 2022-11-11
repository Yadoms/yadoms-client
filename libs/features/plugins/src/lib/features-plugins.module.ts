import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginsPageComponent } from './components/plugins-page/plugins-page.component';

export interface PluginsEnvironnement {
  systemInformationUrl: string;
}

export const PLUGINS_ENVIRONNEMENT = new InjectionToken<PluginsEnvironnement>(
  'PLUGINS_ENVIRONNEMENT'
);

@NgModule({
  imports: [CommonModule],
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
