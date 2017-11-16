import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import { StaffPage } from '../staff/staff';
import { ProfilePage } from '../profile/profile';
import { ListCustomerTreatment } from '../list-customer-treatment/list-customer-treatment'
import { ViewController, NavController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Angular2TokenService } from 'angular2-token';
import { ListTreatmentPage } from '../list-treatment/list-treatment';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  ListTreatmentPage = ListTreatmentPage;
  loading: any;
  ContactPage = ContactPage;
  LoginPage = LoginPage;
  StaffPage = StaffPage;
  ListCustomerTreatment = ListCustomerTreatment;
  isSignedIn: boolean;

  constructor(
    public _navCtrl: NavController,
    private _tokenService: Angular2TokenService,
    public _modalController: ModalController,
    public _viewController: ViewController,
    private _loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public _authServiceProvider: AuthServiceProvider) {
    //  this.isSignedIn = this._authServiceProvider.userSignedIn

  }

  ionViewDidEnter() {
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

  closeModal() {
    this._viewController.dismiss();
  }
}
