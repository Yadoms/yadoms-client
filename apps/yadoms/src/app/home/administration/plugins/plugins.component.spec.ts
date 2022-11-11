import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
} from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PluginsComponent } from './plugins.component';
import { PluginService } from '../../../core/plugin.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared';
import {
  PluginInstance,
  PluginInstanceFullState,
  PluginInstances,
  PluginInstanceState,
  PluginInstancesWithState,
  PluginInstanceWithState,
} from '../../../core/models/pluginInstances';
import {
  AvailablePlugins,
  PluginCategory,
} from '../../../core/models/available-plugin';
import {
  MatInputModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

@Component({ selector: 'yd-admin-page-header', template: '' })
class YdAdminPageMockComponent {}

class MockPluginService extends PluginService {
  pluginInstances = new PluginInstances();
  pluginInstancesWithState = new PluginInstancesWithState();
  availablePlugins = new AvailablePlugins();

  constructor() {
    super(null);

    const pi0 = new PluginInstance();
    pi0.Id = 1;
    pi0.DisplayName = 'System';
    pi0.Type = 'System';
    pi0.Configuration = null;
    pi0.AutoStart = true;
    pi0.Category = PluginCategory.System;

    const pi1 = new PluginInstance();
    pi1.Id = 2;
    pi1.DisplayName = 'My fakePlugin instance';
    pi1.Type = 'dev-fakePlugin';
    pi1.Configuration = {
      StringParameter: '',
      BoolParameter: false,
      IntParameter: 258,
      DecimalParameter: 25.3,
      EnumParameter: 'EnumValue2',
      MySection: {
        content: {
          SubIntParameter: 65535,
          SubStringParameter: '',
        },
      },
      ConditionalParameter: '',
    };
    pi1.AutoStart = true;
    pi1.Category = PluginCategory.User;

    const pi2 = new PluginInstance();
    pi2.Id = 3;
    pi2.DisplayName = 'Plugin 1';
    pi2.Type = 'PluginType1';
    pi2.Configuration = null;
    pi2.AutoStart = true;
    pi2.Category = PluginCategory.User;

    const pi3 = new PluginInstance();
    pi3.Id = 4;
    pi3.DisplayName = 'Plugin 2';
    pi3.Type = 'PluginType1';
    pi3.Configuration = null;
    pi3.AutoStart = true;
    pi3.Category = PluginCategory.User;

    this.pluginInstances.plugins = [pi0, pi1, pi2, pi3];

    this.pluginInstancesWithState.instances = [];
    const pifs0 = new PluginInstanceFullState();
    pifs0.state = PluginInstanceState.Running;
    this.pluginInstancesWithState.instances.push({
      instance: pi0,
      state: pifs0,
    });
    const pifs1 = new PluginInstanceFullState();
    pifs1.state = PluginInstanceState.Stopped;
    this.pluginInstancesWithState.instances.push({
      instance: pi1,
      state: pifs1,
    });
    const pifs2 = new PluginInstanceFullState();
    pifs2.state = PluginInstanceState.Custom;
    pifs2.messageId = 'connecting';
    pifs2.messageData = 'TODO à gérer';
    this.pluginInstancesWithState.instances.push({
      instance: pi2,
      state: pifs2,
    });
    const pifs3 = new PluginInstanceFullState();
    pifs3.state = PluginInstanceState.Error;
    this.pluginInstancesWithState.instances.push({
      instance: pi3,
      state: pifs3,
    });
  }

  public getAllPluginsInstance(): Promise<PluginInstances> {
    return Promise.resolve(this.pluginInstances);
  }

  public getAvailablePluginsInformation(
    fields: string[]
  ): Promise<AvailablePlugins> {
    return Promise.resolve(this.availablePlugins);
  }

  public getAllPluginsInstanceWithState(): Promise<PluginInstancesWithState> {
    return Promise.resolve(this.pluginInstancesWithState);
  }
}

describe('PluginsComponent', () => {
  let component: PluginsComponent;
  let mockPluginService: MockPluginService;
  let fixture: ComponentFixture<PluginsComponent>;
  let mainElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        SharedModule,
        MatTableModule,
        MatInputModule,
        MatSortModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      declarations: [PluginsComponent, YdAdminPageMockComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: PluginService, useClass: MockPluginService }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PluginsComponent);
        component = fixture.componentInstance;
        mainElement = fixture.debugElement.nativeElement;
        component.ngOnInit();
      });
  }));

  beforeEach(() => {
    mockPluginService = new MockPluginService();
  });

  function expectPluginInstancesDisplayed(
    displayedPluginInstances: PluginInstance[]
  ) {
    const lines = mainElement.querySelectorAll('tr.mat-row.pi-row');
    expect(lines.length).toEqual(displayedPluginInstances.length);

    for (
      let piIndex = 0;
      piIndex < displayedPluginInstances.length;
      ++piIndex
    ) {
      const columns = lines[piIndex].querySelectorAll('td.mat-cell');
      expect(columns.length).toEqual(3);
      expect(columns[1].textContent).toEqual(
        displayedPluginInstances[piIndex].DisplayName
      );
      expect(columns[2].textContent).toEqual(
        displayedPluginInstances[piIndex].Type
      );
    }
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header first', () => {
    expect(mainElement.querySelectorAll('*')[0].tagName.toLowerCase()).toEqual(
      'yd-admin-page-header'
    );
  });

  it('should display plugin instances', fakeAsync(() => {
    fixture.detectChanges();
    expectPluginInstancesDisplayed([
      mockPluginService.pluginInstances.plugins[1],
      mockPluginService.pluginInstances.plugins[2],
      mockPluginService.pluginInstances.plugins[3],
      mockPluginService.pluginInstances.plugins[0],
    ]);
  }));

  it('should display 2 instances when filtering with "st"', fakeAsync(() => {
    component.pluginInstances.filter = 'st';
    fixture.detectChanges();
    expectPluginInstancesDisplayed([
      mockPluginService.pluginInstances.plugins[1],
      mockPluginService.pluginInstances.plugins[0],
    ]);
  }));

  it('should display 1 instance with when filtering with "sta"', fakeAsync(() => {
    component.pluginInstances.filter = 'sta';
    fixture.detectChanges();
    expectPluginInstancesDisplayed([
      mockPluginService.pluginInstances.plugins[1],
    ]);
  }));

  it('should display 0 instance with when filtering with "stax"', fakeAsync(() => {
    component.pluginInstances.filter = 'stax';
    fixture.detectChanges();
    expectPluginInstancesDisplayed([]);
  }));

  it('should be sorted according to plugin instance name', fakeAsync(() => {
    fixture.detectChanges();
    // Initially sorted ascending
    expectPluginInstancesDisplayed([
      mockPluginService.pluginInstances.plugins[1],
      mockPluginService.pluginInstances.plugins[2],
      mockPluginService.pluginInstances.plugins[3],
      mockPluginService.pluginInstances.plugins[0],
    ]);

    // const piNameHeader = mainElement.querySelector('th[class$=DisplayName]');
    const piNameHeader = mainElement.querySelector('th.mat-column-DisplayName');

    // Click on sort by instance name
    piNameHeader.click();
    fixture.detectChanges();

    // Initially sorted descending
    expectPluginInstancesDisplayed([
      mockPluginService.pluginInstances.plugins[0],
      mockPluginService.pluginInstances.plugins[3],
      mockPluginService.pluginInstances.plugins[2],
      mockPluginService.pluginInstances.plugins[1],
    ]);

    // Click on sort by instance name
    piNameHeader.click();
    fixture.detectChanges();

    // Initially sorted ascending
    expectPluginInstancesDisplayed([
      mockPluginService.pluginInstances.plugins[1],
      mockPluginService.pluginInstances.plugins[2],
      mockPluginService.pluginInstances.plugins[3],
      mockPluginService.pluginInstances.plugins[0],
    ]);
  }));
});
