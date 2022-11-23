import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import {
  FeaturesPluginsModule,
  PluginsEnvironment
} from '@yadoms/features/plugins';
import {
  FeaturesDevicesModule,
  DevicesEnvironment
} from '@yadoms/features/devices';
import {
  FeaturesSystemModule,
  SystemEnvironment
} from '@yadoms/features/system';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FeaturesPluginsModule.forRoot(environment as PluginsEnvironment),
    FeaturesDevicesModule.forRoot(environment as DevicesEnvironment),
    FeaturesSystemModule.forRoot(environment as SystemEnvironment),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
