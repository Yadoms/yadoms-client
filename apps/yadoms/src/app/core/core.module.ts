import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
  Injector,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from './websocket.service';
import { RestServerService } from './restserver.service';
import { ErrorService } from './error.service';
import { NavigatorService } from './navigator.service';
import { PageService } from './pages.service';
import { WidgetService } from './widget.service';
import { WidgetFactoryService } from './widget.factory.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

/**
 * Export this function to allow TranslateModule initilizing in AOT mode
 */
export function createWidgetFactoryServiceSingleton(injector: Injector) {
  console.log('create WidgetFactoryService');
  return new WidgetFactoryService(injector);
}

export function createRestServerServiceFactory(
  http: HttpClient,
  router: Router,
  location: Location,
  errorService: ErrorService
) {
  return new RestServerService(
    'http://localhost:8080',
    http,
    router,
    location,
    errorService
  );
}

@NgModule({
  imports: [CommonModule],
  providers: [
    WebSocketService,
    RestServerService,
    ErrorService,
    NavigatorService,
    PageService,
    WidgetService,
    WidgetFactoryService,
  ],
})
export class CoreModule {
  public static forRoot(providedLoader?: any): any {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: WidgetFactoryService,
          useFactory: createWidgetFactoryServiceSingleton,
          deps: [Injector],
        },
        { provide: 'baseUrl', useValue: 'http://localhost:8080' },
        //{provide: RestServerService, useFactory: createRestServerServiceFactory, deps: [HttpClient, Router, Location, ErrorService] }
      ],
    };
  }
}
