import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastService } from '../../providers/shared-service/toast-service';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-list-customer-treatment',
  templateUrl: 'list-customer-treatment.html'
})
export class ListCustomerTreatment {
  treatments: Array<any>;
  activeTreatment: Array<any>;
  pastTreatment: Array<any>;
  treatment_count: number;
  name: string;
  isSignedIn: boolean;
  user_id: any;

  constructor(
    private _toastCtrl: ToastService,
    private _loaderCtrl: LoaderService,
    public _modalCtrl: ModalController,
    public navCtrl: NavController,
    public _authServiceProvider: AuthServiceProvider,
    public _restapiServiceProvider: RestapiServiceProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidEnter() {
    const client = localStorage.getItem('client');
    if (client !== null && this._authServiceProvider.currentAuthData !== null) {
      this.listTreatment();
    } else {
      this.presentLogin('ListCustomerTreatment');
    }
  }

  listTreatment() {
    this._loaderCtrl.showLoader();
    this._restapiServiceProvider.getMyBooking()
      .subscribe(response => {
        this._loaderCtrl.hideLoader();
        this.name = response.name;
        this.activeTreatment = response.bookings.filter(item => item.active_status);
        this.pastTreatment = response.bookings.filter(item => !item.active_status);
        this.treatment_count = response.total_booking;
      }, (error) => {
        this._loaderCtrl.hideLoader();
      })
  }
  presentLogin(fromPage) {
    this.navCtrl.push(LoginPage, { 'fromPage': fromPage });
  }
  list(ev) {
    const listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }
}
