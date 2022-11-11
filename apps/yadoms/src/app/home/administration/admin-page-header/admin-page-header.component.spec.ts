import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AdminPageHeaderComponent } from './admin-page-header.component';
import { SystemService } from '../../../core/system.service';
import { SystemInformation } from '../../../core/models/systemInformation';

class MockSystemService extends SystemService {
  systemInformation = new SystemInformation();

  constructor() {
    super(null);

    this.systemInformation.runningPlatform = 'testPlatform';
    this.systemInformation.yadoms = { version: '1.0-test.1' };
    this.systemInformation.startupTime = new Date(2018, 11, 27, 23, 21, 55);
    this.systemInformation.executablePath = 'executable/path';
    this.systemInformation.serverReady = true;
    this.systemInformation.developerMode = true;
  }

  public getInformation(): Promise<SystemInformation> {
    return new Promise<SystemInformation>(() => {
      return this.systemInformation;
    });
  }

  setDeveloperMode(developerMode: boolean) {
    this.systemInformation.developerMode = developerMode;
  }
}

describe('AdminPageHeaderComponent', () => {
  let component: AdminPageHeaderComponent;
  let mockSystemService: MockSystemService;
  let fixture: ComponentFixture<AdminPageHeaderComponent>;

  beforeEach(async(() => {
    mockSystemService = new MockSystemService();
    TestBed.configureTestingModule({
      declarations: [AdminPageHeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: SystemService, useValue: mockSystemService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    component.title = 'thePageTitle';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual('thePageTitle');
  });

  it('should display horizontal bar', () => {
    component.title = 'thePageTitle';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-divider')).toBeTruthy();
  });

  it('should have horizontal bar above title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('*')[0].tagName.toLowerCase()).toEqual(
      'h1'
    );
    expect(compiled.querySelectorAll('*')[1].tagName.toLowerCase()).toEqual(
      'mat-divider'
    );
  });

  it('should not display advertisement when developer mode not initialized', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.developerModeEnable')).toBeNull();
    //TODO
  });

  it('should not display advertisement when developer mode initialized to off', () => {
    //TODO
  });

  it('should not display advertisement when developer mode initialized to on', () => {
    //TODO
  });
});
