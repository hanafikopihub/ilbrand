import { Component } from '@angular/core';

import { IonicPage, ModalController, NavParams, NavController, Platform } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { AlertService } from '../../providers/shared-service/alert-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { PayPalPayment, PayPal, PayPalConfiguration } from '@ionic-native/paypal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@IonicPage()
@Component({
  selector: 'page-history-booking',
  templateUrl: 'history-booking.html'
})

export class HistoryBookingPage {

  fromModal: boolean = false;
  entryForm: FormGroup;
  treatmentParam: any;
  operatorParam: any;
  dataBookingParam: any;
  dataBooking: any;
  dataOther: any;
  payOptions: Array<any>;
  salon: any;
  showFormEmail: boolean;
  showError: boolean = false;

  bookingVisitor;

  payoption: any;
  payoptionModel: any;

  treatment: any
  optionPay: any
  payment: PayPalPayment
  payPalEnvironment: string = 'payPalEnvironmentSandbox';

  constructor(
    private _payPal: PayPal,
    public _navParams: NavParams,
    public _formBuilder: FormBuilder,
    public _modalCtrl: ModalController,
    public _navController: NavController,
    public _loaderCtrl: LoaderService,
    public _alertService: AlertService,
    public _authServiceProvider: AuthServiceProvider,
    public _restapiServiceProvider: RestapiServiceProvider) {

    this.treatmentParam = this._navParams.get('treatment');
    this.operatorParam = this._navParams.get('operators');
    this.dataBookingParam = this._navParams.get('dataBooking');
    this.dataOther = this._navParams.get('dataOther');
    this.salon = this._navParams.get('salon');
    this.fromModal = this._navParams.get('status');

    this.payOptions = [
      { 'id': '1', 'option': 'Paga in salone', 'image': 'assets/icon/shop_icon/shop_icon-AppStore.png', 'disable': false },
      { 'id': '2', 'option': 'Paga con carta di credito', 'image': 'assets/icon/card_icon/card-disable_icon-AppStore.png', 'disable': true}]


    this.payment = new PayPalPayment(this.treatmentParam.price, 'EUR', this.treatmentParam.des_treatment, '');

  }

  buildForm() {
    this.entryForm = this._formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.email]]
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  ionViewDidEnter() {
    this.dataBooking = {
      booking: {
        'time_id': this.dataBookingParam.booking.time_id,
        'date_id': this.dataBookingParam.booking.date_id,
        'month_id': this.dataBookingParam.booking.month_id,
        'year_id': this.dataBookingParam.booking.year_id,
        'length': this.dataBookingParam.booking.length,
        'from_where': 'android',
        'salon_id': this.dataBookingParam.booking.salon_id,
        'price': this.dataBookingParam.booking.price,
        'discount_price': this.dataBookingParam.booking.discount_price,
        'operator_id': this.dataBookingParam.booking.operator_id,
        's_treatment_id': this.dataBookingParam.booking.s_treatment_id,
        'user_id': '',
        'visitor_name': '',
        'visitor_email': '',
        'visitor_phone': ''
      }
    }
    if (this._authServiceProvider.userSignedIn) {
      this.showFormEmail = true;
      this.dataBooking['user_email'] = this._authServiceProvider.currentAuthData.uid;
    } else {
      this.showFormEmail = false;
    }
  }

  list(ev) {
    const listModal = this._modalCtrl.create('ListPage', {'fromPage': 'HistoryBookingPage'})
    listModal.present();
  }

  backToCalendar() {
    this._navController.pop();
  }

  onSave() {
    if (this.showFormEmail) {
      this.validationPay();
    } else {
      this.validationFormEmail();
    }
  }

  validationPay() {
    if (this.payoptionModel !== undefined) {
      this.onSubmit();
    } else {
      this._alertService.failedError('controllare l\'input immesso')
    }
  }

  validationFormEmail() {
    if (this.entryForm.valid && this.payoptionModel !== undefined) {
      this.onSubmit();
    } else {
      this.showError = true;
      this._alertService.failedError('controllare l\'input immesso')
    }
  }

  toLogin() {
    this._navController.push('LoginPage',
      { 'fromPage': 'HistoryBookingPage' })
  }

  onSubmit() {
    this.bookingVisitor = this.entryForm.value;
    this.optionPay = this.payOptions.filter(o => {
      return o.id === this.payoptionModel
    })

    this.optionPay = this.optionPay[0].option

    if (this.payoptionModel === '1') {
      this.toPayDirectly();
    }

    if (this.payoptionModel === '2') {
      this.toPayPal();
    }

    if (this.payoptionModel === undefined) {
      this._loaderCtrl.hideLoader();
      this._alertService.failedError('è necessario selezionare un opzione di pagamento')
    }
  }

  toPayDirectly() {
    this._loaderCtrl.showLoader().then(res => {
      this.dataBooking['visitor_name'] = this.bookingVisitor.name;
      this.dataBooking['visitor_email'] = this.bookingVisitor.email;
      this.dataBooking['visitor_phone'] = this.bookingVisitor.phone;
      this._restapiServiceProvider.postBooking(this.dataBooking).subscribe(response => {
        if (response.error !== undefined) {
          this._alertService.failedError(response.error);
        } else {
          this._navController.push('MyBookingPage',
            {
              salon: this.salon,
              dataBooking: this.dataBooking,
              treatment: this.treatmentParam,
              operators: this.operatorParam,
              dataOther: this.dataOther,
              optionPay: this.optionPay
            })
        }
        this._loaderCtrl.hideLoader();
      }, (error) => {
        console.log(error);
        this._loaderCtrl.hideLoader();
        this._alertService.failedSubmit();
      })
    });
  }

  toPayPal() {
    this._loaderCtrl.showLoader().then(res => {
      this.dataBooking['visitor_name'] = this.bookingVisitor.name;
      this.dataBooking['visitor_email'] = this.bookingVisitor.email;
      this.dataBooking['visitor_phone'] = this.bookingVisitor.phone;
      this.dataBooking['selected_card'] = 'new';
      this._restapiServiceProvider.postBooking(this.dataBooking).subscribe(response => {
        this._loaderCtrl.hideLoader();
        if (response.error !== undefined) {
          this._alertService.failedError(response.error);
        } else {
          localStorage.setItem('booking_nr', JSON.stringify(response.booking_nr))
          this.getPayPal(response);
        }
      }, (error) => {
        this._loaderCtrl.hideLoader();
        this._alertService.failedSubmit();
      })
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
          this._loaderCtrl.hideLoader();
          this.saveToApi(booking_id, paypal_id);
        }, () => {
          this._alertService.failedError('Error or render dialog closed without being successful');

          this._loaderCtrl.hideLoader();
        });
      }, () => {
        this._alertService.failedError('Error in configuration');
      });
    }, () => {
      this._alertService.failedError('Error in initialization, maybe PayPal isn\'t supported or something else');
    });
  }

  saveToApi(booking_id, paypal_id) {
    const data = { 'item_number': booking_id, 'tx': paypal_id }
    this._restapiServiceProvider.postPayPal(data)
      .subscribe(response => {
        this._loaderCtrl.hideLoader();
        this._navController.push('MyBookingPage',
          {
            salon: this.salon,
            dataBooking: this.dataBooking,
            treatment: this.treatmentParam,
            operators: this.operatorParam,
            dataOther: this.dataOther,
            optionPay: this.optionPay
          })
      }, (error) => {
        this._loaderCtrl.hideLoader();
        this._alertService.failedError(error);
      })
  }
}
