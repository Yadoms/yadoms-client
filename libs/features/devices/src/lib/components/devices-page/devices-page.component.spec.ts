import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesPageComponent } from './devices-page.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('DevicesPageComponent', () => {
  let component: DevicesPageComponent;
  let fixture: ComponentFixture<DevicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevicesPageComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(DevicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
