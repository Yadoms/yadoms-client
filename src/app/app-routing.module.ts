import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { CheckServerComponent } from './check/check-server.component';

export const routes: Routes = [
  { path: '',      component: CheckServerComponent, pathMatch: 'full' },
  { path: 'check', component: CheckServerComponent, pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./home/home.module').then(module => module.HomeModule) },
  { path: '**',    component: NoContentComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
