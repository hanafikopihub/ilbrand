import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestapiServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestapiServiceProvider {
  apiUrl = 'https://www.salonist.it/api/v1/';
  apiUrl2 = 'http://bc90e996.ngrok.io/api/v1/bookings/create';
  salons: any;
  salon: any;
  items: any;
  constructor(public http: Http, public _nativeStorage: NativeStorage) {
  }

  getSalon(id) {
    this.salon = null;
    if (this.salon) {
      return Promise.resolve(this.salon);
    }

    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'salons/' + id)
        .map(res => res.json())
        .subscribe(salon => {
          this.salon = salon;
          resolve(this.salon);
          console.log(this.salon);
        });
    });
  }

  getMonths() {
    return this.http.get('assets/json-dummy/month.json')
      .map(res => res.json())
  }

  postBooking(data) {
    return this.http.post(this.apiUrl2,data)
      .map(res => res.json());

  }
}