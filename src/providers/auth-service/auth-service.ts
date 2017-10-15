import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {

  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({
      apiBase: 'https://www.salonist.it',
      apiPath: 'api/v1'
    });
  }

  get userSignedIn(): boolean{
    return this._tokenService.userSignedIn();
  }

  get currentUserData(): any{
    return this._tokenService.currentUserData;
  }

  get currentAuthData(): any{
    return this._tokenService.currentAuthData;
  }

}
