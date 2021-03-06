import { Component } from '@angular/core';
import { Events, Platform, IonicPage, ViewController, NavParams, NavController, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';

import { Angular2TokenService } from 'angular2-token';
import { RequestMethod } from '@angular/http';
import { AppApi } from '../../app.api';
import { ToastService } from '../../providers/shared-service/toast-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  salon_header_name: string;

  loginData = { email: '', password: '', device_token: '', salon_id: AppApi.SALON_ID};
  data: any;
  loading: any;

  fromPage: any;
  fromPageString: string;
  constructor(

    public _toastService: ToastService,
    public navParams: NavParams, 
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController, 
    public modalCtrl: ModalController,
    public events: Events,
    public _restapiServiceProvider: RestapiServiceProvider, 
    private _tokenService: Angular2TokenService) {
    this.salon_header_name = AppApi.SALON_NAME_HEADER;
    this._tokenService.init({
      apiBase: AppApi.BASE_API_URL,
      apiPath: '/api/v1'
    });

    this.fromPage = this.navParams.get('fromPage');
    if (this.fromPage === undefined) {
    }
    if (this.fromPage === 'ListCustomerTreatment') {
      this.fromPage = 'ListCustomerTreatment'
    }

    if (this.fromPage === 'ProfileSettingPage') {
      this.fromPage = 'ProfileSettingPage'
    }

    if (this.fromPage === 'HistoryBookingPage') {
      this.fromPageString = 'HistoryBookingPage'
    }
  }

  ionViewDidEnter() {
    const client = localStorage.getItem('client');
    if (client) {
      this.navCtrl.push('' + this.fromPage + '')
    }
  }
  submitLogin() {
    if (this.loginData.email === '' || this.loginData.password === '') {
      this._toastService.presentToast('Completa con tutti i dati, grazie!')
    } else {
      this.doLogin();
    }
  }
  doLogin() {
    this.showLoader();
    this.loginData.device_token = localStorage.getItem("device_token");
    this._tokenService.request({
      method: RequestMethod.Post,
      url: AppApi.BASE_API_URL + '/api/v1/auth/sign_in',
      body: this.loginData
    }).subscribe(
      res => {        
        this.loading.dismiss();
        this.viewCtrl.dismiss();
        this.events.publish('page:logged', true);
      },
      error => {
        this.loading.dismiss();
        const error_message = JSON.parse(error._body);
        this.presentToast(error_message.errors.join('. '));
      }
      );
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Attendere...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
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

  toRegister() {
    this.navCtrl.push('RegisterPage')
  }

  toChangePassword() {
    this.navCtrl.push('ChangePasswordPage')
  }

  closeModal() {
    if (this.fromPageString === 'HistoryBookingPage') {
      this.viewCtrl.dismiss();
    } else {
      // this.navCtrl.push('HomePage', { 'status': true });
      // when close modal, back to before page, not redirect to Home page
      this.viewCtrl.dismiss();
    }
  }

}
