import { Component, OnInit } from "@angular/core";
import { PluginEntity } from "../../+state/plugins/plugin.models";
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import * as PluginSelectors from "../../+state/plugins/plugin.selectors";
import * as PluginActions from "../../+state/plugins/plugin.actions";

@Component({
  selector: "yadoms-plugins-page",
  templateUrl: "./plugins-page.component.html",
  styleUrls: ["./plugins-page.component.scss"]
})
export class PluginsPageComponent implements OnInit {

  plugins$: Observable<PluginEntity[]> = of([]);

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(PluginActions.initPlugins());
    this.plugins$ = this.store.select(PluginSelectors.getAllPlugins);
  }
}
