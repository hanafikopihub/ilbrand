import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ListCustomerTreatment } from '../list-customer-treatment/list-customer-treatment'
import { ViewController, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Angular2TokenService } from 'angular2-token';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  loading: any;
  LoginPage = LoginPage;
  ListCustomerTreatment = ListCustomerTreatment;
  isSignedIn: boolean;
  isHistoryPage: boolean = false;

  constructor(
    public _navCtrl: NavController,
    public _navParams: NavParams,
    private _tokenService: Angular2TokenService,
    public _modalController: ModalController,
    public _viewController: ViewController,
    private _loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public _authServiceProvider: AuthServiceProvider) {
    //  this.isSignedIn = this._authServiceProvider.userSignedIn

  }

  ionViewDidEnter() {
    const from = this._navParams.get('fromPage');
    if ( from === 'HistoryBookingPage') {
      this.isHistoryPage = true;
    }
    if (this._authServiceProvider.currentAuthData === undefined || this._authServiceProvider.currentAuthData === null) {
      this.isSignedIn = false
    } else {
      this.isSignedIn = true
    }
  }

  goLogin(ev) {
    const loginModal = this._modalController.create(LoginPage)
    loginModal.present();
  }

  goMybook(ev) {
    this._navCtrl.push(ListCustomerTreatment)
  }

  goMyProfile(ev) {
    this._navCtrl.push(ProfilePage)
  }

  goListTreatment() {
    this._navCtrl.push('ListTreatmentPage', {'status' : true})
  }

  doLogout() {
    this.loading = this._loadingCtrl.create({
      content: 'Please Wait, logout still processing..'
    });

    this.loading.present();
    this._tokenService.signOut().subscribe(
      res => {
        this.loading.dismiss();
        this._viewController.dismiss();
      },
      error => {
        this.loading.dismiss();
        this.presentToast(error);
        this._viewController.dismiss();
      }
    )
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

  goContactPage() {
    this._navCtrl.push('ContactPage');
  }

  goStaffPage() {
    this._navCtrl.push('StaffPage');
  }

  closeModal() {
    this._viewController.dismiss();
  }
}
