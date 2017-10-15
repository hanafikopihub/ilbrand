import { Component } from '@angular/core';
import { ViewController, NavController, ToastController, LoadingController} from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { RequestMethod } from '@angular/http';

@Component({
  selector: 'page-profile-setting',
  templateUrl: 'profile-setting.html',
})
export class ProfileSettingPage {

  passwordData = { password: '', passwordConfirmation: '' };
  loading: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,  private toastCtrl: ToastController, 
     private loadingCtrl: LoadingController,  private _tokenService: Angular2TokenService) {
    this._tokenService.init({
      apiBase: 'https://www.salonist.it',
      apiPath: 'api/v1'
    });
  }

  updatePassword(){
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

  showLoader(){
    this.loading = this.loadingCtrl.create({
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
}