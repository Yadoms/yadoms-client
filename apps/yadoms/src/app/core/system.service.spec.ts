import {TestBed} from '@angular/core/testing';

import {SystemService} from './system.service';
import {RestServerService} from './restserver.service';

describe('SystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: RestServerService}]
  }));

  it('should be created', () => {
    const service: SystemService = TestBed.get(SystemService);
    expect(service).toBeTruthy();
  });
});
