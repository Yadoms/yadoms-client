import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './home.routing';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared';
import { PageComponent } from './page/page.component';
import { TranslateModule } from '@ngx-translate/core';
//import {NgxPageScrollModule} from 'ngx-page-scroll';

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

import {
  MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { AppDateAdapter } from '../app.dates';
//import {FlexLayoutModule} from '@angular/flex-layout';
import { WidgetComponent } from './widget/widget.component';
import { AdministrationModule } from './administration/administration.module';
import { PluginHostDirective } from './widget/plugin-host.directive';
import { ErrorService } from '../core/error.service';
import { PageService } from '../core/pages.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    TranslateModule,
    SharedModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSortModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatSliderModule,
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule,
    MatGridListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    AdministrationModule,
  ],
  exports: [],
  declarations: [
    HomeComponent,
    PageComponent,
    WidgetComponent,
    PluginHostDirective,
  ],
  providers: [
    ErrorService,
    PageService,
    { provide: DateAdapter, useValue: AppDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class HomeModule {
  constructor() {
    console.log('Home module CTOR');
  }
}
