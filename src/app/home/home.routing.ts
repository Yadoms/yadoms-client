import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: '', pathMatch:'full', redirectTo: 'page/first' },
      { path: 'dashboard', redirectTo: 'page/first' },
      { path: 'page/first', component: PageComponent },
      { path: 'page/:id', component: PageComponent },
      { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
