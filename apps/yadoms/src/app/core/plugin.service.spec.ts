import { TestBed, inject } from '@angular/core/testing';

import { PluginService } from './plugin.service';
import { RestServerService } from './restserver.service';
import { AdminPageHeaderComponent } from '../home/administration/admin-page-header/admin-page-header.component';
import { SystemService } from './system.service';
import { SystemInformation } from './models/systemInformation';

describe('PluginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: RestServerService }],
    });
  });

  it('should be created', () => {
    const service: SystemService = TestBed.get(SystemService);
    expect(service).toBeTruthy();
  });
});
