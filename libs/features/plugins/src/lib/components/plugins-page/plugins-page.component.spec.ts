import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginsPageComponent } from './plugins-page.component';

describe('PluginsPageComponent', () => {
  let component: PluginsPageComponent;
  let fixture: ComponentFixture<PluginsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PluginsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PluginsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
