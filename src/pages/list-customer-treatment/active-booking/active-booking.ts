import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../../providers/restapi-service/restapi-service';
import { ToastService } from '../../../providers/shared-service/toast-service';
import { LoaderService } from '../../../providers/shared-service/loader-service';
import { AlertService } from '../../../providers/shared-service/alert-service';

import { ListCustomerTreatment } from '../../list-customer-treatment/list-customer-treatment';

@Component({
  selector: 'page-active-booking',
  templateUrl: 'active-booking.html',
})
export class ActiveBookingPage {
  booking: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public _loader: LoaderService,
    private _toastCtrl: ToastService,
    public _alertService: AlertService,
    public _restapiServiceProvider: RestapiServiceProvider,
    public _viewController: ViewController) {
  }

  ionViewDidLoad() {
    const bookingParam = this.navParams.get('booking');

    this.booking = {
      title: bookingParam.title,
      reservation_date: bookingParam.reservation_date,
      reservation_hour: bookingParam.reservation_hour,
      salon_name: '',
      salon_address: '',
      operator_name: '',
      option_pay: '',
      price: ''
    }

    this._loader.showLoader();
    this._restapiServiceProvider.getDetailBooking(bookingParam.booking_id)
      .subscribe(data => {
        this._loader.hideLoader();
        this.booking = data;
      }, (error) => {
        this._loader.hideLoader();
        this._viewController.dismiss();
        this._alertService.errorConnectionAlert();
        return this._toastCtrl.presentToast('non è riuscito a ottenere dati');
      });
  }

  popView() {
    this.navCtrl.pop();
  }

  cancel() {
    this._loader.showLoader();
    this._restapiServiceProvider.postCancelBooking(this.booking.booking_id)
      .subscribe(data => {
        this._loader.hideLoader();
        this.navCtrl.push(ListCustomerTreatment);
        this._toastCtrl.presentToast('Prenotazione annullata!');
      }, (error) => {
        console.log(error);
        this._loader.hideLoader();
        this._viewController.dismiss();
        this._alertService.errorConnectionAlert();
        return this._toastCtrl.presentToast('non è riuscito a ottenere dati');
      });
  }

}
