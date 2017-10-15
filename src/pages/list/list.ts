import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { StaffPage } from '../staff/staff';
import { ListCustomerTreatment } from '../list-customer-treatment/list-customer-treatment'
import { ViewController, NavController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  loading: any;
  ContactPage = ContactPage;
  LoginPage = LoginPage;
  StaffPage = StaffPage;
  ListCustomerTreatment = ListCustomerTreatment;
  public isSignedIn: boolean;

  constructor(
    public _navCtrl: NavController,
    private _tokenService: Angular2TokenService,
    public _modalController: ModalController,
    public _viewController: ViewController,
    private _loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public _authServiceProvider: AuthServiceProvider) {
    this.isSignedIn = this._authServiceProvider.userSignedIn
  }

  goLogin(ev) {
    let loginModal = this._modalController.create(LoginPage)
    loginModal.present();
  }

  goMybook(ev){
    this._navCtrl.push(ListCustomerTreatment)
  }

  doLogout() {
    this.loading = this._loadingCtrl.create({
      content: 'Please Wait, logout still processing..'
    });

    this.loading.present();
    this._tokenService.signOut().subscribe(
      res => {
        this.loading.dismiss();
        this._navCtrl.setRoot(HomePage);
      },
      error => {
        this.loading.dismiss();
        this.presentToast(error);
      }
    )
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
