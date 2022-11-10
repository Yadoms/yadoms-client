import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ydPluginHost]'
})
export class PluginHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
