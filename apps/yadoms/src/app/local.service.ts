import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor() { }

  getLanguage() {
    return navigator.language ;//|| navigator..userLanguage
    //return 'fr-FR';
  }
}