import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from './app.service';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Yadoms';

/**
   * Application name
   */
 public name = 'Yadoms web client';

 /**
  * Constructor
  * @param appState The appState
  * @param translate The translate service
  * @param dateAdapter
  */
 constructor(public appState: AppState, translate: TranslateService, private dateAdapter: DateAdapter<any>) {
   try {
     // this language will be used as a fallback
     translate.setDefaultLang('en');
     // the lang to use, if the lang isn't available
     translate.use(translate.getBrowserLang() ?? "en");
     // define app language
   
    //TODO : add moment
     moment.locale(translate.getBrowserLang() || window.navigator.language || 'en');

     dateAdapter.setLocale(translate.getBrowserLang() || window.navigator.language || 'en');
   } catch (e) {
     console.error('Fail to initialize locale');
     console.error(e);
   }
 }

 /**
  * Initialize component
  */
 public ngOnInit() {
   // log initial appState
   console.log('Initial App State', this.appState.state);
 }  
}
