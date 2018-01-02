import { Component } from '@angular/core';
import { ViewController, NavController, ToastController, LoadingController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { AppApi } from '../../app.api';

@Component({
  selector: 'page-profile-setting',
  templateUrl: 'profile-setting.html',
})
export class ProfileSettingPage {

  passwordData = { password: '', passwordConfirmation: '' };
  loading: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private toastCtrl: ToastController,
    private loadingCtrl: LoadingController, private _tokenService: Angular2TokenService) {
    this._tokenService.init({
      apiBase: AppApi.BASE_API_URL,
      apiPath: 'api/v1'
    });
  }

  updatePassword() {
    this.showLoader();
    this._tokenService.updatePassword(this.passwordData).subscribe(
      res => {
        console.log(res);
        this.loading.dismiss();
      },
      error => {
        this.loading.dismiss();
        this.presentToast(error);
      }
    )
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
}
