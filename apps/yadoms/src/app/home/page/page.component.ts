import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  AfterViewInit,
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Page } from '../../core/models/page';
import { PageService } from '../../core/pages.service';
//import * as Packery from 'packery-rows';
import { WidgetService } from '../../core/widget.service';
import { Widgets } from '../../core/models/widgets';
import { switchMap } from 'rxjs/operators';
import { Widget } from '../../core/models/widget';

@Component({
  selector: 'yd-page',
  templateUrl: 'page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit, AfterViewInit {
  //private _packery: Packery;

  @Input() public data: Page | undefined;
  public widgets: Widget[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private widgetService: WidgetService
  ) {}

  public ngOnInit() {
    /*this._packery = new Packery( '.grid', {
            // options
            itemSelector: '.widget',
            gutter: 10
        });*/
    this.initializeComponentFromRoute();
  }

  public ngAfterViewInit() {
    //this._packery.reloadItems();
  }

  /**
   * Initialize the component from the route parameters
   * If an 'id' is present in parameters, then use it,
   * Else select the first page
   */
  private initializeComponentFromRoute() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const idFromUrl = params.get('id');
          if (!idFromUrl) {
            return this.pageService.getFirst();
          } else {
            return this.pageService.get(+idFromUrl); // convert idFromUrl to number with '+'
          }
        })
      )
      .subscribe((p: Page) => {
        this.data = p;
        this.initializeWidgets();
      });
  }

  private initializeWidgets() {
    if (this.data && this.data.id) {
      this.widgetService.getForPage(this.data.id).then((widgets: Widgets) => {
        this.widgets = widgets.widget;
      });
    }
  }
}
