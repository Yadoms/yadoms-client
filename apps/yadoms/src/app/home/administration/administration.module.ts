import { NgModule } from '@angular/core';
import { administrationRoutes } from './administration.route';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

import { HttpClientModule } from '@angular/common/http';

import { AdminPageHeaderComponent } from './admin-page-header/admin-page-header.component';

import { FormsModule } from '@angular/forms';

import { SystemComponent } from './system/system.component';
import { PluginsComponent } from './plugins/plugins.component';
import { DevicesComponent } from './devices/devices.component';
import { AutomationComponent } from './automation/automation.component';
import { RecipientsComponent } from './recipients/recipients.component';
import { UpdateComponent } from './update/update.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AboutComponent } from './about/about.component';
import { SharedModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    administrationRoutes,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatDividerModule,
    FormsModule,
    SharedModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatChipsModule,
  ],
  declarations: [
    AdminPageHeaderComponent,
    SystemComponent,
    PluginsComponent,
    DevicesComponent,
    AutomationComponent,
    RecipientsComponent,
    UpdateComponent,
    MaintenanceComponent,
    AboutComponent,
  ],
})
export class AdministrationModule {}
