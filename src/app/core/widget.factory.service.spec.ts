import { TestBed, inject } from '@angular/core/testing';

import { WidgetFactoryService } from './widget.factory.service';

describe('WidgetFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WidgetFactoryService]
    });
  });

  it('should be created', inject([WidgetFactoryService], (service: WidgetFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
