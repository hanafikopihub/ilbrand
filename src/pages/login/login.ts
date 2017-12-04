import { Component } from '@angular/core';
import { ViewController, NavParams, NavController, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { Angular2TokenService } from 'angular2-token';
import { RequestMethod } from '@angular/http';
import { AppApi } from '../../app.api';

import { HomePage } from '../home/home';
import { ProfileSettingPage } from '../profile-setting/profile-setting';
import { ListCustomerTreatment } from '../list-customer-treatment/list-customer-treatment';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public isLoginFormShow: boolean;
  public isRegisterFormShow: boolean;
  public isForgetPasswordFormShow: boolean;

  loginData = { email: '', password: '' };
  resetData = { email: '' };
  registerData = { email: '', password: '', password_confirmation: '', cell: '' };
  data: any;
  loading: any;

  fromPage: any;
  fromPageString: string;
  constructor(
    public navParams: NavParams, public navCtrl: NavController, public viewCtrl: ViewController, private toastCtrl: ToastController,
    private loadingCtrl: LoadingController, public modalCtrl: ModalController,
    public _authServiceProvider: AuthServiceProvider, private _tokenService: Angular2TokenService) {
    this._tokenService.init({
      apiBase: AppApi.BASE_API_URL,
      apiPath: '/api/v1'
    });

    this.isLoginFormShow = true
    this.isRegisterFormShow = false
    this.isForgetPasswordFormShow = false


    this.fromPage = this.navParams.get('fromPage');
    if (this.fromPage === undefined) {
    }
    if (this.fromPage === 'ListCustomerTreatment') {
      this.fromPage = ListCustomerTreatment
    }

    if (this.fromPage === 'ProfileSettingPage') {
      this.fromPage = ProfileSettingPage
    }

    if (this.fromPage === 'HistoryBookingPage') {
      this.fromPageString = 'HistoryBookingPage'
    }
  }

  ionViewDidEnter() {
    const client = localStorage.getItem('client');
    if (client) {
      this.navCtrl.push(this.fromPage)
    }
  }
  doLogin() {
    this.showLoader();
    this._tokenService.request({
      method: RequestMethod.Post,
      url: AppApi.BASE_API_URL + '/api/v1/auth/sign_in',
      body: this.loginData
    }).subscribe(
      res => {
        this.loading.dismiss();
        this.viewCtrl.dismiss();
      },
      error => {
        this.loading.dismiss();
        const error_message = JSON.parse(error._body);
        this.presentToast(error_message.errors.join('. '));
      }
      );
  }

  doRequestResetPassword() {
    this.showLoader();
    this._tokenService.resetPassword(this.resetData).subscribe(
      res => {
        this.loading.dismiss();
        this.navCtrl.push(HomePage, { 'status': true });
        this.presentToast('We have sent the reset password instruction to your email');
      },
      error => {
        this.loading.dismiss();
        this.presentToast(error);
      }
    );
  }

  doRegister() {
    this.showLoader();
    this._tokenService.request({
      method: RequestMethod.Post,
      url: AppApi.BASE_API_URL + '/api/v1/auth',
      body: { user: this.registerData }
    }).subscribe(
      res => {
        this.loginData = { email: this.registerData.email, password: this.registerData.password };
        this._tokenService.request({
          method: RequestMethod.Post,
          url: AppApi.BASE_API_URL + '/api/v1/auth/sign_in',
          body: this.loginData
        }).subscribe(
          response => {
            this.loading.dismiss();
            this.viewCtrl.dismiss();
            this.presentToast('Welcome to ilbrand!');
          },
          error => {
            this.loading.dismiss();
            this.presentToast(error);
          }
          );
      },
      error => {
        this.loading.dismiss();
        const error_message = JSON.parse(error._body);
        this.presentToast(error_message.errors.full_messages.join('. '));
      }
      );
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
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

  presentRegister() {
    this.isLoginFormShow = false
    this.isForgetPasswordFormShow = false
    this.isRegisterFormShow = true
  }

  presentForgetPassword() {
    this.isLoginFormShow = false
    this.isForgetPasswordFormShow = true
    this.isRegisterFormShow = false
  }

  presentLogin() {
    this.isLoginFormShow = true
    this.isForgetPasswordFormShow = false
    this.isRegisterFormShow = false
  }

  closeModal() {
    if (this.fromPageString === 'HistoryBookingPage') {
      this.viewCtrl.dismiss();
    } else {
      this.navCtrl.push(HomePage, { 'status': true });
    }
  }

}
