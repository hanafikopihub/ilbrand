import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../../providers/restapi-service/restapi-service';
import { ToastService } from '../../../providers/shared-service/toast-service';
import { LoaderService } from '../../../providers/shared-service/loader-service';
import { AlertService } from '../../../providers/shared-service/alert-service';

@IonicPage()
@Component({
  selector: 'page-active-booking',
  templateUrl: 'active-booking.html',
})
export class ActiveBookingPage {
  booking: any;
  voucherUseStatus: boolean = false;
  rimanente: any;
  voucherPrice: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public _loader: LoaderService,
    private _toastCtrl: ToastService,
    public _alertService: AlertService,
    public _restapiServiceProvider: RestapiServiceProvider,
    public _viewController: ViewController) {
  }

  ionViewDidLoad() {
    // for back button hardwere (android)
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => this.back());
    })

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
        if (this.booking.voucher_id !== 0) {
          this.voucherUseStatus = true;
          this.rimanente = this.booking.vouchered_price;
          this.voucherPrice = this.booking.voucher_credit_used;
        }
      }, (error) => {
        this._loader.hideLoader();
        this._viewController.dismiss();
        this._alertService.errorConnectionAlert(error);
        return this._toastCtrl.presentToast('Attenzione! Questa app necessita di una connessione internet per funzionare');
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
        this.navCtrl.push('ListCustomerTreatment');
        this._toastCtrl.presentToast('Prenotazione annullata!');
      }, (error) => {
        console.log(error);
        this._loader.hideLoader();
        this._viewController.dismiss();
        this._alertService.errorConnectionAlert(error);
        return this._toastCtrl.presentToast('Attenzione! Questa app necessita di una connessione internet per funzionare');
      });
  }

  back() {
    this._loader.hideLoader();
    this.navCtrl.pop();
  }

}
