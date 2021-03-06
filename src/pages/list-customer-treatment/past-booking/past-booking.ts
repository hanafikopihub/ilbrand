import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../../providers/restapi-service/restapi-service';
import { ToastService } from '../../../providers/shared-service/toast-service';
import { LoaderService } from '../../../providers/shared-service/loader-service';
import { AlertService } from '../../../providers/shared-service/alert-service';

import { AppApi } from '../../../app.api';

@IonicPage()
@Component({
  selector: 'page-past-booking',
  templateUrl: 'past-booking.html',
})
export class PastBookingPage {
  salon_header_name: string;
  booking: any;
  treatment: any;
  salon: any;
  review_entry: any;
  rating = { environment: 0, service: 0, staff: 0, quality: 0, review: '' };

  voucherUseStatus: boolean = false;
  rimanente: any;
  voucherPrice: any;
  priceDisplay: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public _loader: LoaderService,
    private _toastCtrl: ToastService,
    public _alertService: AlertService,
    public _restapiServiceProvider: RestapiServiceProvider,
    public _viewController: ViewController) {
      this.salon_header_name = AppApi.SALON_NAME_HEADER;
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

    this.salon = {};

    this.treatment = {
      s_treatment_id: null,
      des_treatment: 'Piega',
      price: 25,
      duration_in_minute: 45,
      duration: 2700
    }

    this._loader.showLoader()
    this._restapiServiceProvider.getDetailBooking(bookingParam.booking_id)
      .subscribe(data => {
        this.booking = data;

        if (this.booking.price !== this.booking.discount_price){
          this.priceDisplay = this.booking.discount_price
        }else{
          this.priceDisplay = this.booking.price
        }

        if (this.booking.voucher_id !== 0) {
          this.voucherUseStatus = true;
          this.rimanente = this.booking.vouchered_price;
          this.voucherPrice = this.booking.voucher_credit_used;
        }
        this._restapiServiceProvider.getDetailTreatment(bookingParam.s_treatment_id).subscribe(res => {
          this.treatment = res;

          this._restapiServiceProvider.getSalon(this.booking.salon_id).subscribe(respone => {
            this.salon = respone;
            this._loader.hideLoader();
          }, (error) => {
            this._loader.hideLoader();
            this._viewController.dismiss();
            this._alertService.errorConnectionAlert(error);
            this._toastCtrl.presentToast('Attenzione! Questa app necessita di una connessione internet per funzionare');
          });

        }, (error) => {
          this._loader.hideLoader();
          this._viewController.dismiss();
          this._alertService.errorConnectionAlert(error);
          this._toastCtrl.presentToast('Attenzione! Questa app necessita di una connessione internet per funzionare');
        });
      }, (error) => {
        this._loader.hideLoader();
        this._viewController.dismiss();
        this._alertService.errorConnectionAlert(error);
        this._toastCtrl.presentToast('Attenzione! Questa app necessita di una connessione internet per funzionare');
      });
  }

  rebooking() {
    this.navCtrl.push('BookingPage', { treatment: this.treatment, salon: this.salon })
  }

  postReview() {
    this._loader.showLoader();
    this.rating['salon_id'] = this.booking.salon_id;
    this.rating['booking_nr'] = this.booking.booking_nr;
    this.rating['treatment_id'] = this.booking.booking_treatment_id;
    this._restapiServiceProvider.postSalonReview(this.rating).subscribe(
      res => {
        this.navCtrl.pop();
        this._loader.hideLoader();
        this._toastCtrl.presentToast('Grazie!');
      },
      error => {
        this._loader.hideLoader();
        this._toastCtrl.presentToast(error);
      }
    )
  }

  back() {
    this._loader.hideLoader();
    this.navCtrl.pop();
  }

}
