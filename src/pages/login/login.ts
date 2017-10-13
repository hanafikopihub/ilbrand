import { Component } from '@angular/core';
import { ViewController, NavController, ToastController, LoadingController, ModalController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

import { Angular2TokenService } from 'angular2-token';
import { RequestMethod } from '@angular/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  // show or hide form
  public isLoginFormShow:boolean;
  public isRegisterFormShow:boolean;
  public isForgetPasswordFormShow:boolean;

  loginData = { email:'', password:'' };
  resetData = { email:''};
  registerData = { email:'', password:'', password_confirmation: '', cell: ''};
  loading: any;

  constructor(
  	public navCtrl: NavController,
  	public _modalController: ModalController,
    public _viewController: ViewController,
    public _loadingCtrl: LoadingController,
    private _tokenService: Angular2TokenService,
    private toastCtrl: ToastController) {
    
    this._tokenService.init({
        apiBase: 'https://www.salonist.it',
        apiPath: 'api/v1'
      });
    
    this.isLoginFormShow = true
    this.isRegisterFormShow = false
    this.isForgetPasswordFormShow = false
  }

  doLogin() {
    this.showLoader();
    this._tokenService.request({
      method: RequestMethod.Post,
      url:    'https://www.salonist.it/api/v1/auth/sign_in',
      body:   this.loginData
    }).subscribe(
      res =>  {
        console.log(res);
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      error =>{
        this.loading.dismiss();  
        this.presentToast(error);
      }
    );
  }

  doRegister(){
    this.showLoader();
    this._tokenService.request({
      method: RequestMethod.Post,
      url:    'https://www.salonist.it/api/v1/auth',
      body:   {user: this.registerData}
    }).subscribe(
      res =>  {
        this.loginData = { email: this.registerData.email, password: this.registerData.password };
        this._tokenService.request({
          method: RequestMethod.Post,
          url:    'https://www.salonist.it/api/v1/auth/sign_in',
          body:   this.loginData
        }).subscribe(
          res =>  {
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
            this.presentToast("Welcome to salonist");
          },
          error =>{
            this.loading.dismiss();  
            this.presentToast(error);
          }
        );
      },
      error =>{
        console.log(error.json())
        this.loading.dismiss();  
        this.presentToast(error);
      }
    );
  }

  doRequestResetPassword(){
    this.showLoader();
    this._tokenService.resetPassword(this.resetData).subscribe(
      res => {
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
        this.presentToast("We have sent the reset password instruction to your email");
      },
      error => {
        this.loading.dismiss();  
        this.presentToast(error);
      }
    );
  }

  presentRegister(){
    this.isLoginFormShow = false
    this.isForgetPasswordFormShow = false
    this.isRegisterFormShow = true
  }

  presentForgetPassword(){
    this.isLoginFormShow = false
    this.isForgetPasswordFormShow = true
    this.isRegisterFormShow = false
  }

  presentLogin(){
    this.isLoginFormShow = true
    this.isForgetPasswordFormShow = false
    this.isRegisterFormShow = false
  }

  showLoader(){
    this.loading = this._loadingCtrl.create({
       content: 'Authenticating...'
    });
    this.loading.present();
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
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

  closeModal() {
    this._viewController.dismiss();
  }

}
