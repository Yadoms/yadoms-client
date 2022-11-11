import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginsPageComponent } from './components/plugins-page/plugins-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PluginsPageComponent],
  exports: [PluginsPageComponent],
})
export class FeaturesPluginsModule {}
