import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastService } from '../../providers/shared-service/toast-service';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-list-customer-treatment',
  templateUrl: 'list-customer-treatment.html'
})
export class ListCustomerTreatment {
  loading: any;
  name: string;
  prenoCount: any;
  treatments: Array<any>;
  treatment_count: number;
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

  ionViewDidLoad() {

    this._loaderCtrl.showLoader();
    console.log(this._authServiceProvider.currentAuthData);

    this._restapiServiceProvider.getMyBooking()
      .subscribe(response => {
        this.treatments = response.bookings;
        this.treatment_count = response.total_booking;
        this._loaderCtrl.hideLoader();
      }, (error) => {
        this._loaderCtrl.hideLoader();
        this._toastCtrl.presentToast(error);
      })

    // this.treatments = [{"title":"Piedi Applicazione Semipermanen","salon_name":"Yndaco Seregno","reservation_date":"19/02/2017"}]
  }

  list(ev) {
    const listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }
}
