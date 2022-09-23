import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../app.service';
import { RestServerService } from '../core/restserver.service';
import { PageService } from '../core/pages.service';
import { Pages } from '../core/models/pages';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'yd-home',
  providers: [],
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  public pages: Pages | undefined;

  public today: number = Date.now();

  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public appState: AppState, public translate: TranslateService, private router: Router, private restServerService: RestServerService,
    private pageService: PageService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  public ngOnInit() {
    console.log('home component loaded');

    this.pageService.getAll()
    .then( (pages: Pages) => {
      this.pages = pages;
    });
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
