import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPageComponent } from './system-page.component';

describe('SystemPageComponent', () => {
  let component: SystemPageComponent;
  let fixture: ComponentFixture<SystemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
