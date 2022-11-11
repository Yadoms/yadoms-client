import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { FeaturesPluginsModule, PluginsEnvironnement } from '@yadoms/features/plugins';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FeaturesPluginsModule.forRoot(environment as PluginsEnvironnement),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
