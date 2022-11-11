import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetComponent } from './widget.component';
import { WidgetFactoryService } from '../../core/widget.factory.service';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatIconModule,
  MatLineModule,
  MatListModule,
  MatMenuModule,
  MatSortModule,
  MatTabsModule,
  MatChipsModule,
  MatInputModule,
  MatRadioModule,
  MatTableModule,
  MatCommonModule,
  MatDialogModule,
  MatOptionModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSidenavModule,
  MatStepperModule,
  MatToolbarModule,
  MatTooltipModule,
  MatGridListModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatPseudoCheckboxModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';

class WidgetFactoryServiceMockup {
  async load(params: any) {
    return { instance: { data: null } };
  }
}

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetComponent],
      imports: [
        MatSnackBarModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatCardModule,
        MatIconModule,
        MatLineModule,
        MatListModule,
        MatMenuModule,
        MatSortModule,
        MatTabsModule,
        MatChipsModule,
        MatInputModule,
        MatRadioModule,
        MatTableModule,
        MatCommonModule,
        MatDialogModule,
        MatOptionModule,
        MatRippleModule,
        MatSelectModule,
        MatSliderModule,
        MatSidenavModule,
        MatStepperModule,
        MatToolbarModule,
        MatTooltipModule,
        MatGridListModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatPseudoCheckboxModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
      ],
      providers: [
        { provide: WidgetFactoryService, useClass: WidgetFactoryServiceMockup },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponent);
    fixture.componentInstance.pluginHost = { viewContainerRef: null };
    fixture.componentInstance.configuration = { title: 'test' };
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
