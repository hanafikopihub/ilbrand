import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestapiServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestapiServiceProvider {
  apiUrl = 'https://www.salonist.it/api/v1/';
  apifake = 'https://74bc7841.ngrok.io/api/v1/';
  salons: any;
  salon: any;
  items: any;
  constructor(public http: Http) {
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
        });
    });
  }

  getMonths() {
    return this.http.get('assets/json-dummy/month.json')
      .map(res => res.json())
  }

  getMonth(month, year) {
    const data = {year:year, month:month}
    return this.http.post(this.apiUrl +'finds/month_calendar',data)
    .map(res => res.json())
  }
  
  searchSalons(treatment, location, page){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + 'finds/salons', {treatment: treatment, where: location, page: page})
        .map(res => res.json())
        .subscribe(salons => {
          this.salons = salons;
          resolve(this.salons);
        });
    });
  }

  get_treatment() {
    return this.http.get(this.apiUrl + 'treatments/popular')
      .map(res => res.json())
  }
  
  get_address(value) {
    const addresss = { "address": value }
    return this.http.post(this.apiUrl + 'finds/address', addresss)
      .map(res => res.json())
  }

  getMyBooking(user_id){
    return this.http.post(this.apiUrl + 'bookings/my', {user_id: user_id})
      .map(res => res.json())
  }
  
  getOperator(data) {
    return this.http.post(this.apiUrl + 'operators/available_for_treatments', data)
      .map(res => res.json())
  }

  postBooking(data) {
    return this.http.post(this.apiUrl + 'bookings/create', data)
      .map(res => res.json())
  }
  
}