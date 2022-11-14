import { Routes } from '@angular/router';
import { PluginsPageComponent } from '@yadoms/features/plugins';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: PluginsPageComponent },
  { path: 'plugins', component: PluginsPageComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];
