import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { CheckServerComponent } from './check/check-server.component';

export const ROUTES: Routes = [
  { path: '',      component: CheckServerComponent, pathMatch: 'full' },
  { path: 'check', component: CheckServerComponent, pathMatch: 'full'},
  { path: 'home',  component: HomeComponent },
  { path: '**',    component: NoContentComponent },
];
