import { Injectable } from '@angular/core';
import { RestServerService } from './restserver.service';
import { Pages } from './models/pages';
import { Page } from './models/page';
//import * as _ from 'lodash';

@Injectable()
export class PageService {
  constructor(private restServerService: RestServerService) {}

  /**
   * Get all declared pages
   * @returns The page list, through Promise
   */
  public getAll(): Promise<Pages> {
    return this.restServerService.get<Pages>('page');
  }

  /**
   * Get the first page, ordered by pageOrder, then id and finally by name
   */
  public getFirst(): Promise<Page> {
    return new Promise<Page>((resolve, reject) => {
      this.getAll()
        .then((pages: Pages) => {
          if (pages?.page == null || pages?.page == undefined)
            reject('nopages');
          else resolve(pages.page[0]);
        })
        .catch(reject);
    });
  }

  /**
   * Get all declared pages
   * @returns The page list, through Promise
   */
  public get(id: number): Promise<Page> {
    return this.restServerService.get<Page>('page/' + id);
  }
}
