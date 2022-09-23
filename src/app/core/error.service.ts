import { Injectable } from '@angular/core';
import { Utilities } from '../shared/utilities';
import { RestResult } from './rest-result';
import { TranslateService } from '@ngx-translate/core';

export enum ErrorCodes {
      CONNECTION_UNAVAILABLE = -1,
      UNKNOWN_ERROR = 1000,
      INVALID_SIGNATURE = 1001,
      INVALID_LOGIN_PASSWORD = 1100,
      NOT_LOGGED = 1101,
      SESSION_EXPIRED = 1102,
      JS_UNKNOWN_ERROR = 4000,
      USER_NOT_AUTHENTICATED = 4001
}

export interface ErrorInfo {
      code: ErrorCodes;
      message: string;
}

@Injectable()
export class ErrorService {
  constructor(private translate: TranslateService) {
  }

  public createRestErrorMessage(error: RestResult): Promise<ErrorInfo> {
    return this.createErrorMessage(error.errorCode, error.errorMessage || error.errorCode);
  }

  public createUnknownError(error: any): Promise<ErrorInfo> {
    return this.createErrorMessage(ErrorCodes.UNKNOWN_ERROR, error);
  }
   /**
    * Méthode permettant de créer le message d'erreur
    * @param {Object} error - L'erreur.
    * @param {Integer} error.errorCode Le code erreur
    * @param {String} error.errorMessage Le message à afficher si le code erreur n'est pas significatif
    */
   public createErrorMessage(errorCode: ErrorCodes, param?: any): Promise<ErrorInfo> {
      let errMessage = '';
      switch (errorCode) {
         case ErrorCodes.CONNECTION_UNAVAILABLE:
            errMessage = 'Connexion impossible';
            break;
         case ErrorCodes.UNKNOWN_ERROR:
            errMessage = 'Erreur inconnue';
            break;
         case ErrorCodes.INVALID_SIGNATURE:
            errMessage = 'Identifiant/Mot de passe invalide';
            break;
         case ErrorCodes.INVALID_LOGIN_PASSWORD:
            errMessage = 'Identifiant/Mot de passe invalide';
            break;
         case ErrorCodes.NOT_LOGGED:
            errMessage = 'Pas authentifié';
            break;
         case ErrorCodes.SESSION_EXPIRED:
            errMessage = 'Session expirée';
            break;
         case ErrorCodes.JS_UNKNOWN_ERROR:
            errMessage = 'Erreur JS inconnue';
            break;
         default:
            errMessage = 'errors.unknown';
            break;
      }

      return new Promise<ErrorInfo>( (resolve: (value: ErrorInfo | PromiseLike<ErrorInfo>) => void, reject: (reason?: any) => void) => {
         this.translate.get(errMessage, param).subscribe({
            next(translation: string) {
               resolve({ code: errorCode, message: translation });
            }, 
            error() {
               resolve({ code: errorCode, message: errMessage });
            },
         })

            // this.translate.get(errMessage, param).subscribe( (translation: string) => {
            //       resolve({ code: errorCode, message: translation });
            // }, (translationFailure: any) => {
            //       resolve({ code: errorCode, message: errMessage });
            // });
      });
   }

}
