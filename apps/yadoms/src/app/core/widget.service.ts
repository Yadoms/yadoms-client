import {Injectable} from '@angular/core';
import {RestServerService} from './restserver.service';
import {Widgets} from './models/widgets';
import {WidgetPackages} from './models/widget.packages';

@Injectable()
export class WidgetService {
  constructor(private restServerService: RestServerService) {
  }

  public getAll(): Promise<Widgets> {
    // TODO filtrer les 'dev-' si pas en mode développeur
    return this.restServerService.get<Widgets>('widget');
  }

  public getAllPackages(): Promise<WidgetPackages> {
    // TODO filtrer les 'dev-' si pas en mode développeur
    return this.restServerService.get<WidgetPackages>('widget/package');
  }

  public getForPage(idPage: number): Promise<Widgets> {
    return this.restServerService.get<Widgets>('page/' + idPage + '/widget');
  }
}
