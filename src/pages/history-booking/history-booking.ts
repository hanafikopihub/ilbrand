import { Component } from '@angular/core';
import { MyBookingPage } from '../my-booking/my-booking';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ListPage } from '../list/list';
import { ModalController, NavParams, NavController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { AlertService } from '../../providers/shared-service/alert-service';

import { PayPalPayment, PayPal, PayPalConfiguration } from '@ionic-native/paypal';

@Component({
  selector: 'page-history-booking',
  templateUrl: 'history-booking.html'
})

export class HistoryBookingPage {

  treatmentParam: any;
  operatorParam: any;
  dataBooking: any;
  dataOther: any;
  payOptions: Array<any>;
  salon: any;

  payoption: any;
  payoptionModel: any;
  MyBookingPage = MyBookingPage;

  treatment: any

  payment: PayPalPayment
  payPalEnvironment: string = 'payPalEnvironmentSandbox';

  constructor(
    private _payPal: PayPal,
    public _navParams: NavParams,
    public _modalCtrl: ModalController,
    public _navController: NavController,
    public _loaderCtrl: LoaderService,
    public _alertService: AlertService,
    public _restapiServiceProvider: RestapiServiceProvider) {

    this.treatmentParam = this._navParams.get('treatment');
    this.operatorParam = this._navParams.get('operators');
    this.dataBooking = this._navParams.get('dataBooking');
    this.dataOther = this._navParams.get('dataOther');
    this.salon = this._navParams.get('salon');

    this.payOptions = [
      { 'id': 1, 'option': 'Paga in salone' },
      { 'id': 2, 'option': 'Paga con carta di credito' }]


    this.payment = new PayPalPayment(this.treatmentParam.price, 'EUR', this.treatmentParam.des_treatment, '');

  }

  onSubmit() {
    this._loaderCtrl.showLoader();
    if (this.payoptionModel === '1') {
      this.toPayDirectly();
    }

    if (this.payoptionModel === '2') {
      this.toPayPal();
    }
  }

  toPayDirectly() {
    this._restapiServiceProvider.postBooking(this.dataBooking).subscribe(response => {
      this._navController.push(MyBookingPage,
        {
          salon: this.salon,
          dataBooking: this.dataBooking,
          treatment: this.treatmentParam,
          operators: this.operatorParam,
          dataOther: this.dataOther
        })
      this._loaderCtrl.hideLoader();
    }, (error) => {
      this._loaderCtrl.hideLoader();
      this._alertService.failedSubmit();
    })
  }

  toPayPal() {
    this._loaderCtrl.showLoader();
    this.dataBooking['selected_card'] = 'new';
    this._restapiServiceProvider.postBooking(this.dataBooking).subscribe(response => {
      localStorage.setItem('booking_nr', JSON.stringify(response.booking_nr))
      this.getPayPal(response);
    }, (error) => {
      this._loaderCtrl.hideLoader();
      this._alertService.failedSubmit();
    })
  }

  getPayPal(response) {
    this._payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AXg409-ZD7lFcgk2JdHkLkggX8u7LnT7cfkGL2AG0y7bx5OAvOmErpKKz5D68kzXRxbfe_KRlFf681rk'
    }).then(() => {
      this._payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
        this._payPal.renderSinglePaymentUI(this.payment).then((res) => {
          const booking_id = JSON.parse(localStorage.getItem('booking_nr'));
          const paypal_id = res.response.id
          this.saveToApi(booking_id, paypal_id);
        }, () => {
          console.error('Error or render dialog closed without being successful');
          this._alertService.failedError('Error or render dialog closed without being successful');
        });
      }, () => {
        console.error('Error in configuration');
        this._alertService.failedError('Error in configuration');
      });
    }, () => {
      console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
      this._alertService.failedError('Error in initialization, maybe PayPal isn\'t supported or something else');
    });
  }

  saveToApi(booking_id, paypal_id) {
    const data = { 'item_number': booking_id, 'tx': paypal_id }
    this._restapiServiceProvider.postPayPal(data)
      .subscribe(response => {
        this._loaderCtrl.hideLoader();
        this._navController.push(MyBookingPage,
          {
            salon: this.salon,
            dataBooking: this.dataBooking,
            treatment: this.treatmentParam,
            operators: this.operatorParam,
            dataOther: this.dataOther
          })
      }, (error) => {
        this._loaderCtrl.hideLoader();
        this._alertService.failedError(error);
      })
  }

  list(ev) {
    let listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }

}
