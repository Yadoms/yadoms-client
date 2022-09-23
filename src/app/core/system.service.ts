import {Injectable} from '@angular/core';
import {RestServerService} from './restserver.service';
import {SystemInformation} from './models/systemInformation';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private restServerService: RestServerService) {
  }

  public getInformation(): Promise<SystemInformation> {
    // TODO filtrer les 'dev-' si pas en mode développeur
    return this.restServerService.get<SystemInformation>('system/information');
  }
}
