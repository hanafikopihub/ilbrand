import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { HomePage } from '../home/home';
import { ProfileSettingPage } from '../profile-setting/profile-setting';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loading: any;

  // routeing page
  ProfileSettingPage = ProfileSettingPage;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, 
    private _tokenService: Angular2TokenService, private toastCtrl: ToastController, 
     private loadingCtrl: LoadingController) {
    this._tokenService.init({
      apiBase: 'https://www.salonist.it',
      apiPath: 'api/v1'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  doLogout() {
    this.loading = this.loadingCtrl.create({
       content: 'Please Wait, logout still processing..'
    });

    this.loading.present();
    this._tokenService.signOut().subscribe(
      res => {
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      error => {
        this.loading.dismiss();  
        this.presentToast(error);
      }
    )
  }

  closeModal() {
    this.viewCtrl.dismiss();
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
