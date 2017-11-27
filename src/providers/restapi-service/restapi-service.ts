import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { AppApi } from '../../app.api';
import { CacheService } from 'ionic-cache';
import { Angular2TokenService } from 'angular2-token';
import { RequestMethod } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the RestapiServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class RestapiServiceProvider {
  apiUrl = AppApi.BASE_API_URL + '/api/v1/'
  salons: any;
  salon: any;
  items: any;
  constructor(
    public http: Http,
    private _toastCtrl: ToastController,
    public _authServiceProvider: Angular2TokenService,
    private cache: CacheService) {
  }

  presentToast(msg) {
    const toast = this._toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  getSalon(id) {
    return this.http.get(this.apiUrl + 'salons/' + id)
      .map(res => res.json());
  }

  searchSalons(treatment, location, price, page) {
    return this.http.post(this.apiUrl + 'finds/salons', { treatment: treatment, where: location, price: price, page: page })
      .map(res => res.json())
  }


  getMonths() {
    const data = { year: '', 'month': '' }
    return this.http.post(this.apiUrl + 'finds/month_calendar', data)
      .map(res => res.json())
  }

  getMonth(month, year) {
    const data = { year: year, 'month': month }
    return this.http.post(this.apiUrl + 'finds/month_calendar', data)
      .map(res => res.json())
  }

  getTreatment() {
    return this.http.get(this.apiUrl + 'treatments/popular')
      .map(res => res.json())
  }

  getDetailTreatment(id) {
    return this.http.get(this.apiUrl + 'treatments/' + id)
      .map(res => res.json())
  }

  getProfile(email) {
    const url = this.apiUrl + 'finds/profile';
    const cacheKey = url;
    const request = this.http.post(url, { email: email }).map(res => res.json())

    return this.cache.loadFromObservable(cacheKey, request);
  }

  getAddress(value) {
    const addresss = { 'address': value }
    return this.http.post(this.apiUrl + 'finds/address', addresss)
      .map(res => res.json())
  }
  postUpdateCell(number) {
    return this._authServiceProvider.request({
      method: RequestMethod.Post,
      url: this.apiUrl + 'accounts/update_cell',
      body: { cell: number }
    }).map(res => res.json())
  }
  // getMyBooking(user_id) {
  //   return this.http.post(this.apiUrl + 'bookings/my', { user_id: user_id })
  //     .map(res => res.json())
  // }

  getMyBooking() {
    return this._authServiceProvider.request({
      method: RequestMethod.Post,
      url: this.apiUrl + 'bookings/my',
      body: { salon_id: AppApi.SALON_ID }
    }).map(res => res.json())
  }

  getDetailBooking(bookingId) {
    return this._authServiceProvider.request({
      method: RequestMethod.Get,
      url: this.apiUrl + 'bookings/' + bookingId
    }).map(res => res.json())
  }

  postCancelBooking(bookingId) {
    return this._authServiceProvider.request({
      method: RequestMethod.Post,
      url: this.apiUrl + 'bookings/cancel',
      body: { booking_id: bookingId }
    }).map(res => res.json())
  }

  getOperator(data) {
    return this.http.post(this.apiUrl + 'operators/available_for_treatments', data)
      .map(res => res.json())
  }

  postBooking(data) {
    return this._authServiceProvider.request({
      method: RequestMethod.Post,
      url: this.apiUrl + 'bookings/create',
      body: data
    }).map(res => res.json())
  }

  postPayPal(data) {
    return this.http.post(this.apiUrl + 'bookings/paypal_confirm', data)
      .map(res => res.json())
  }


  postSalonReview(data) {
    return this._authServiceProvider.request({
      method: RequestMethod.Post,
      url: this.apiUrl + 'reviews/create',
      body: data
    }).map(res => res.json())
  }
}
