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
    cache.setDefaultTTL(1 * 60);
  }

  presentToast(msg) {
    const toast = this._toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.present();
  }

  getSalon(id) {
    const url = this.apiUrl + 'salons/' + id;
    const request = this.http.get(url).map(res => res.json());
    return this.cache.loadFromObservable(url, request);
  }

  setupDeviceToken(token, device_os, user_id, salon_id) {
    const data = { token: token, device_os: device_os, user_id: user_id, salon_id: salon_id}
    return this.http.post(this.apiUrl + 'accounts/setup_device_token', data)
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

  getDetailTreatment(id) {
    return this.http.get(this.apiUrl + 'treatments/' + id)
      .map(res => res.json())
  }

  postPriceTreatment(id, when){
   const treatment_data = { 'id': id, 'when': when }
    return this.http.post(this.apiUrl + 'treatments/price', treatment_data)
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

  postVoucherVerify(data) {
    return this._authServiceProvider.request({
      method: RequestMethod.Post,
      url: this.apiUrl + 'vouchers/verify',
      body: data
    }).map(res => res.json())
  }

  postUpdateCell(number) {
    return this._authServiceProvider.request({
      method: RequestMethod.Post,
      url: this.apiUrl + 'accounts/update_cell',
      body: { cell: number }
    }).map(res => res.json())
  }

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

  getListOperator(salon_id){
    const url = this.apiUrl + 'operators/by_salon/' + salon_id;
    const request = this.http.get(url).map(res => res.json());
    return this.cache.loadFromObservable(url, request);
  }

  getSalonSetting(salon_id){
    const url = this.apiUrl + 'salon_settings/' + salon_id;
    const request = this.http.get(url).map(res => res.json());
    return this.cache.loadFromObservable(url, request);
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
