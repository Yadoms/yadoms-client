import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemPageComponent } from './component/system-page/system-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSystem from './+state/system/system.reducer';
import { SystemEffects } from './+state/system/system.effects';

export interface SystemEnvironment {
  production: boolean;
  informationUrl: string;
}

export const SYSTEM_ENVIRONMENT = new InjectionToken<SystemEnvironment>(
  'SYSTEM_ENVIRONMENT'
);

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSystem.SYSTEM_INFORMATION_FEATURE_KEY,
      fromSystem.systemReducer
    ),
    EffectsModule.forFeature([SystemEffects]),
  ],
  declarations: [SystemPageComponent],
  exports: [SystemPageComponent],
})
export class FeaturesSystemModule {
  static forRoot(
    environment: SystemEnvironment
  ): ModuleWithProviders<FeaturesSystemModule> {
    return {
      ngModule: FeaturesSystemModule,
      providers: [{ provide: SYSTEM_ENVIRONMENT, useValue: environment }],
    };
  }
}
