import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';
import { HomePage } from '../home/home';
import { ProfileSettingPage } from '../profile-setting/profile-setting';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { ListPage } from '../list/list';
import { AppApi } from '../../app.api';
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
  profile = {
    email : '',
    name : '',
    number : '',
    preno_count : ''
  }
  // routeing page
  ProfileSettingPage = ProfileSettingPage;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams,
    private _tokenService: Angular2TokenService, private toastCtrl: ToastController,
    public _restapiServiceProvider: RestapiServiceProvider,
    public _authServiceProvider: AuthServiceProvider,
    public _modalCtrl: ModalController,
    private loadingCtrl: LoadingController) {
    this._tokenService.init({
      apiBase: AppApi.BASE_API_URL,
      apiPath: 'api/v1'
    });
  }
  ionViewDidLoad() {
    const currentEmail = this._authServiceProvider.currentAuthData.uid;
    const loader = this.loadingCtrl.create({
      content: 'loading...',
    });

    loader.present().then(() => {
      this._restapiServiceProvider.getProfile(currentEmail)
        .subscribe(response => {
          this.profile = {
            email : response.email,
            name : response.name,
            number : response.number,
            preno_count : response.preno_count
          }
          loader.dismiss();
        }, (error) => {
          this.presentToast(error);
        })
    });
  }

  list(ev) {
    const listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }

  doLogout() {
    this.loading = this.loadingCtrl.create({
      content: 'Please Wait, logout still processing..'
    });

    this.loading.present();
    this._tokenService.signOut().subscribe(
      res => {
        this.loading.dismiss();
        this.navCtrl.push(HomePage);
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
