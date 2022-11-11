import { Component, OnInit, Compiler, Injector } from '@angular/core';
import { ViewContainerRef, ViewChild } from '@angular/core';

import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import { Injectable } from '@angular/core';
import { WidgetDefinition } from './models/widget.defition';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WidgetFactoryService {
  /**
   * The module compiler (will compile and digest it as module/components)
   */
  private compiler: Compiler;

  /**
   * The widget base path
   */
  private widgetBasePath = 'assets/widgets/';

  /**
   * The mutex state (false: unlock, true: locked)
   */
  private mutexLocked = false;

  /**
   * The widget factories already loaded (avoid multiple loading)
   */
  private loadedComponentFactories: Map<
    string,
    AngularCore.ComponentFactory<any>
  > = new Map<string, AngularCore.ComponentFactory<any>>();

  /**
   * Constructr
   * @param injector The injector instance
   */
  constructor(injector: Injector) {
    this.compiler = injector.get(Compiler);
  }

  /**
   * Load a widget and instanciate a coponant
   *
   * This method is mutexed => to enhance performances method should not be called simultaneously
   * @param widgetDefinition The definition
   * @param componentHostView The view where component will be placed
   */
  public async load(
    widgetDefinition: WidgetDefinition,
    componentHostView: ViewContainerRef
  ): Promise<AngularCore.ComponentRef<any>> {
    // get the mutex
    while (this.mutexLocked) {
      await delay(10);
    }
    this.mutexLocked = true;

    try {
      // get/create the component factory (async load widget files if needed...)
      const componentFactory = await this.getComponentFactory(widgetDefinition);
      if (componentFactory) {
        // clear destintation place
        componentHostView.clear();

        // instanciate the component
        const componentRef =
          componentHostView.createComponent(componentFactory);

        // release mutex
        this.mutexLocked = false;
        return componentRef;
      } else {
        this.mutexLocked = false;
        throw new Error('cannot find factory for app-plugin-component');
      }
    } catch (error) {
      this.mutexLocked = false;
      throw error;
    }
  }

  /**
   * Get the component factory for the widget to load
   * @param widgetDefinition The definition
   */
  private async getComponentFactory(
    widgetDefinition: WidgetDefinition
  ): Promise<AngularCore.ComponentFactory<any> | undefined> {
    if (this.loadedComponentFactories.has(widgetDefinition.name)) {
      return this.loadedComponentFactories.get(widgetDefinition.name);
    } else {
      const href =
        this.widgetBasePath +
        widgetDefinition.name +
        '/' +
        widgetDefinition.name +
        '.js';

      const response = await fetch(href);
      const source = await response.text();

      const exports: any = {}; // this will hold module exports
      const modules: any = {
        // this is the list of modules accessible by plugin
        '@angular/core': AngularCore,
        '@angular/common': AngularCommon,
      };

      const require: any = (module: any) => {
        return modules[module];
      }; // shim 'require'

      // eval is mandatory here, just disable linting for this line
      // tslint:disable-next-line:no-eval
      eval(source); // interpret the plugin source
      const mwcf = this.compiler.compileModuleAndAllComponentsSync(
        exports[widgetDefinition.module]
      );

      const componentFactory = mwcf.componentFactories.find(
        (e) => e.selector === widgetDefinition.componentSelector
      ); // find the entry component
      if (componentFactory) {
        this.loadedComponentFactories.set(
          widgetDefinition.name,
          componentFactory
        );
        return componentFactory;
      } else {
        throw new Error('cannot find factory for app-plugin-component');
      }
    }
  }
}
