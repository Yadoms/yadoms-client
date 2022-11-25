import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesPageComponent } from './components/devices-page/devices-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDevices from './+state/devices/devices.reducer';
import { DevicesEffects } from './+state/devices/devices.effects';
import { HttpClientModule } from '@angular/common/http';

export interface DevicesEnvironment {
  production: boolean;
  devicesUrl: string;
}

export const DEVICES_ENVIRONMENT = new InjectionToken<DevicesEnvironment>(
  'DEVICES_ENVIRONMENT'
);

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    StoreModule.forFeature(
      fromDevices.DEVICES_FEATURE_KEY,
      fromDevices.devicesReducer
    ),
    EffectsModule.forFeature([DevicesEffects]),
  ],
  declarations: [DevicesPageComponent],
})
export class FeaturesDevicesModule {
  static forRoot(
    environment: DevicesEnvironment
  ): ModuleWithProviders<FeaturesDevicesModule> {
    return {
      ngModule: FeaturesDevicesModule,
      providers: [{ provide: DEVICES_ENVIRONMENT, useValue: environment }],
    };
  }
}
