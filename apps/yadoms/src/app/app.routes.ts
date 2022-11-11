import { Routes } from '@angular/router';
import { CheckServerComponent } from './check/check-server.component';
import { PluginsPageComponent } from '@features/plugins';
import { HomeComponent } from './components/home/home.component';
import { NoContentComponent } from './components/no-content';

export const ROUTES: Routes = [
  {
    path: '',
    component: CheckServerComponent,
    pathMatch: 'full',
    redirectTo: 'home',
  },
  { path: 'home', component: HomeComponent },
  { path: 'check', component: CheckServerComponent },
  { path: 'plugins', component: PluginsPageComponent },
  { path: '404', component: NoContentComponent },
  { path: '**', component: NoContentComponent },
];
