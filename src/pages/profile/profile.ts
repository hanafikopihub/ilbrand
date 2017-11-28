
import { Component } from '@angular/core';
import { ViewController, NavController, ModalController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastService } from '../../providers/shared-service/toast-service';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { AppApi } from '../../app.api';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  passwordData = { password: '', passwordConfirmation: '' };
  phoneNumber: any;
  loading: any;
  email: string;
  number: string;
  name: string;

  isSignedIn: boolean;
  showPhoneForm: boolean = false;
  showPasswordForm: boolean = false;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public _authServiceProvider: AuthServiceProvider,
    public _restapiServiceProvider: RestapiServiceProvider,
    private _toastCtrl: ToastService,
    public _loaderCtrl: LoaderService,
    private _tokenService: Angular2TokenService) {
    this._tokenService.init({
      apiBase: AppApi.BASE_API_URL,
      apiPath: '/api/v1'
    });
    this.isSignedIn = this._authServiceProvider.userSignedIn;
  }

  ionViewDidEnter() {
    const client = localStorage.getItem('client');
    if (client !== null && this._authServiceProvider.currentAuthData !== null) {
      this.getProfile();
    } else {
      this.presentLogin('ProfileSettingPage');
    }
  }

  getProfile() {
    const currentEmail = this._authServiceProvider.currentAuthData.uid;
    this._loaderCtrl.showLoader().then(res => {
      this._restapiServiceProvider.getProfile(currentEmail)
        .subscribe(response => {
          this._loaderCtrl.hideLoader();
          this.email = response.email;
          this.number = response.number;
          this.name = response.name;
          this.phoneNumber = response.number;
        }, (error) => {
          this._loaderCtrl.hideLoader();
          this._toastCtrl.presentToast(error);
        });
    })
  }

  presentLogin(fromPage) {
    this.navCtrl.push(LoginPage, { 'fromPage': fromPage });
  }

  updatePassword() {
    this._loaderCtrl.showLoader().then(response => {
      this._tokenService.updatePassword(this.passwordData).subscribe(
        res => {
          this._loaderCtrl.hideLoader();
          this.showPasswordForm = false;
          this._toastCtrl.presentToast('Password aggiornata correttamente!');
        },
        error => {
          this._loaderCtrl.hideLoader();
          this._toastCtrl.presentToast(error);
        }
      )
    })

  }

  updateCell() {
    this._loaderCtrl.showLoader().then(response => {
      this._restapiServiceProvider.postUpdateCell(this.phoneNumber).subscribe(
        res => {
          this._loaderCtrl.hideLoader();
          this.showPhoneForm = false;
          this.number = this.phoneNumber;
          this._toastCtrl.presentToast('Numero aggiornata correttamente!');
        },
        error => {
          this._loaderCtrl.hideLoader();
          this._toastCtrl.presentToast(error);
        }
      )
    });
  }

  list(ev) {
    const listModal = this.modalCtrl.create(ListPage)
    listModal.present();
  }

  changePassword() {
    this.showPasswordForm = true;
    this.showPhoneForm = false;
  }

  changePhone() {
    this.showPasswordForm = false;
    this.showPhoneForm = true;
  }

  closeModal() {
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot(HomePage);
  }

}
