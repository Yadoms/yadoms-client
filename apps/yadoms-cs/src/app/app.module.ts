import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { FeaturesPluginsModule, PluginsEnvironnement } from '@yadoms/features/plugins';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FeaturesPluginsModule.forRoot(environment as PluginsEnvironnement),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
