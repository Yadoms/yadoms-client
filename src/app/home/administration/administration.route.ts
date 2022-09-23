import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { PluginsComponent } from './plugins/plugins.component';
import { DevicesComponent } from './devices/devices.component';
import { AutomationComponent } from './automation/automation.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { UpdateComponent } from './update/update.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    { path: '', pathMatch:'full', redirectTo: 'AboutComponent' },
    { path: 'system', component: SystemComponent },
    { path: 'plugins', component: PluginsComponent },
    { path: 'devices', component: DevicesComponent },
    { path: 'automation', component: AutomationComponent },
    { path: 'recipients', component: RecipientsComponent },
    { path: 'update', component: UpdateComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: 'about', component: AboutComponent }
];

export const administrationRoutes: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
