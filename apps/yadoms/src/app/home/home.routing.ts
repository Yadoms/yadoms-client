import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PageComponent } from './page/page.component';
import { PluginsPageComponent } from "../../../../../libs/features/plugins/src";

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: '', pathMatch:'full', redirectTo: 'page/first' },
      { path: 'dashboard', redirectTo: 'page/first' },
      { path: 'page/first', component: PageComponent },
      { path: 'page/:id', component: PageComponent },
      { path: 'plugins', component: PluginsPageComponent },
      { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
