import { Component, ViewChild } from '@angular/core';

import { ElementRef, Renderer } from '@angular/core';
import {
  ModalController,
  NavController,
  NavParams,
  Slides,
  Content
} from 'ionic-angular';

// libary local
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { IonicPage, Platform, Events } from 'ionic-angular';

import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { AlertService } from '../../providers/shared-service/alert-service';
import { ToastService } from '../../providers/shared-service/toast-service';
import { LoaderService } from '../../providers/shared-service/loader-service';

import { AppApi } from '../../app.api';

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})

export class BookingPage {
  salon_header_name: string;
  
  // status user login or logout
  public isSignedIn: boolean;

  // general variable
  salonParam: any;
  treatmentParam: any;
  operators: any;
  nameOperator: any;
  nameOperatorClick: any;

  scrollStatus: string;

  // variable for modification style
  changeColorTime: any;
  changeColorDate: any;
  changeColorMonth: any;
  setColorMonth: any;
  setColorDate: any;
  hideTime: boolean = false;

  // time variable date
  operatorArray: Array<any>
  times: Array<any>;
  months: Array<any>;
  dates: Array<any>;
  timeId: string;
  dateId: string;
  monthId: string;
  yearId: string;
  dayName: any;
  monthName: any;

  // show hide button
  ionScroll: any;
  showheader: boolean;
  hideheader: boolean;

  @ViewChild(Content) content: Content;
  @ViewChild('sliderMonth') sliderMonth: Slides;
  @ViewChild('sliderDate') sliderDate: Slides;
  @ViewChild('sliderTime') sliderTime: Slides;

  constructor(
    public navCtrl: NavController, public renderer: Renderer, public myElement: ElementRef, public navParams: NavParams,

    private _toastCtrl: ToastService,
    public _alertService: AlertService,
    public _authServiceProvider: AuthServiceProvider,
    public _loaderCtrl: LoaderService,
    public _modalCtrl: ModalController,
    public _navController: NavController,
    public _navParams: NavParams,
    public _events: Events,
    public _restapiServiceProvider: RestapiServiceProvider,
    public plt: Platform
  ) {
    this.salon_header_name = AppApi.SALON_NAME_HEADER;

    this.showheader = false;
    this.hideheader = true;

    this.scrollStatus = 'can-scroll';
    // sign login or logout
    this.isSignedIn = this._authServiceProvider.userSignedIn

    // get data from paramater
    this.salonParam = this._navParams.get('salon');
    this.treatmentParam = this._navParams.get('treatment');

    _events.subscribe('page:scroll', (data) => {
      this.scrollStatus = data;
    });
  }

  // load this function although callback button from next page
  ionViewDidEnter() {

    // for back button hardwere (android)
    this.plt.ready().then(() => {
      this.plt.registerBackButtonAction(() => this.back());
    })

    // clear and set today when callback from history page
    this.dateId = '';
    this.monthId = '';
    this.yearId = '';
    this.timeId = undefined;

    // set position, color and other property slider when first load
    this.sliderMonth.slideTo(1 - 1, 500);
    this.sliderDate.slideTo(1 - 1, 500);
    this.setColorMonth = 1;
    this.changeColorMonth = 1;
    this.setColorDate = 1;
    this.changeColorDate = 1;
    this.changeColorTime = 'false'

    this.sliderMonth.speed = 600;
    this.sliderMonth.centeredSlides = false;
    this.sliderDate.centeredSlides = false;
    if (this.sliderTime !== undefined) {
      this.sliderTime.centeredSlides = false;
    }
    this.getMonths();
  }

  ionViewDidLoad() {
    if (this.plt.is('ipad') || this.plt.is('tablet')) {
      this.sliderMonth.slidesPerView = 7.5;
      this.sliderDate.slidesPerView = 7.5;
    } else {
      this.sliderMonth.slidesPerView = 3.4;
      this.sliderDate.slidesPerView = 3.4;
    }

    if (this.sliderTime !== undefined) {
      if (this.plt.is('ipad') || this.plt.is('tablet')) {
        this.sliderTime.slidesPerView = 7;
      } else {
        this.sliderTime.slidesPerView = 3;
      }
    }
  }

  ngOnInit() {
    // Ionic scroll element
    this.ionScroll = this.myElement.nativeElement.getElementsByClassName('scroll-content')[0];
    // On scroll function
    this.ionScroll.addEventListener('scroll', () => {
      this.showheader = false;
      this.hideheader = true;
    });
  }

  // get month during 1 year
  getMonths() {
    this._loaderCtrl.showLoader();
    this._restapiServiceProvider.getMonths()
      .subscribe(response => {
        this._loaderCtrl.hideLoader();
        this.dates = response.days;
        this.months = response.months;
        this.dayName = response.days[0].day
        this.monthName = response.months[0].month; // month date display
        this.dateId = response.days[0].date;
        this.monthId = response.months[0].month_id;
        this.yearId = response.months[0].year;
        this.setOperator(this.dateId, this.monthId, this.yearId)

      },
      (error) => {
        // handle error
        this._loaderCtrl.hideLoader();
        return this._toastCtrl.presentToast('Attenzione! Questa app necessita di una connessione internet per funzionare');
      })
  }

  onClickMonth(month) {

    this.showheader = false;
    this.hideheader = true;

    this.hideTime = true;
    this.monthId = month.month_id
    this.sliderDate.centeredSlides = false
    this._restapiServiceProvider.getMonth(month.month_id, month.year)
      .subscribe(response => {
        this.dates = response.days; // get data array from api

        this.monthName = month.month; // month date display
        this.yearId = month.year;
        this.changeColorMonth = month.id;
        // this.operatorArray = response.operators[0].operators

        this.setColorMonth = 'false';
        this.setColorDate = 'false';
        this.changeColorTime = 'false';
        this.changeColorDate = 'false';

        this.dateId = undefined;
        this.timeId = undefined;

        this.nameOperator = null;
        this.times = null;
        this.operators = null;
      }, (error) => {
        return this._toastCtrl.presentToast('non è possibile ottenere mese da api');
      })

  }

  onClickDate(date) {

    this.showheader = false;
    this.hideheader = true;

    this.hideTime = false;
    this.changeColorTime = 'false';
    this.timeId = undefined;
    this.setColorDate = 'false';
    this.dateId = date.date;
    this.dayName = date.day;
    this.changeColorDate = date.id;
    this.setOperator(this.dateId, this.monthId, this.yearId)
  }

  onClickTime(time) {
    this.changeColorTime = time.id;
    this.timeId = time.hour;

    this.showheader = true;
    this.hideheader = false;

  }

  // set object data for passing to get treatment
  setOperator(dateId, monthId, yearId) {

    this._loaderCtrl.showLoader();

    const datetimefull = dateId + '/' + monthId + '/' + yearId

    const treatmentGetOperator = [
      {
        'treatment_id': this.treatmentParam.s_treatment_id,
        'duration': this.treatmentParam.duration
      }]

    const data = { 'when': datetimefull, 'treatments': treatmentGetOperator }
    this.getOperator(data)
  }

  // get oprator data
  getOperator(data) {
    this._restapiServiceProvider.getOperator(data).subscribe(response => {

      this._loaderCtrl.hideLoader();
      this.operatorArray = response.operators[0].operators;

      // validate slider
      this.operatorArray.map(o => {
        if (this.plt.is('ipad') || this.plt.is('tablet')) {
          o.slider = 7.4
        } else {
          o.slider = 3.4
        }
      })

      if (response.operators[0].operators.length === 0) {
        this.operators = null;
        this.times = null;
        this.nameOperator = null;
        return this._toastCtrl.presentToast('Nessuna disponibilita per il giorno selezionato')
      }

    }, (error) => {
      this._loaderCtrl.hideLoader();
      return this._toastCtrl.presentToast('Attenzione! Questa app necessita di una connessione internet per funzionare');
    })
  }

  postOperator(operator) {
    this.operators = operator;
  }
  presentLogin(event) {
    const loginModal = this._modalCtrl.create('LoginPage')
    loginModal.present();
  }

  onSumbit() {
    if (this.operators == null || this.timeId === undefined || this.dateId === undefined) {
      return this._toastCtrl.presentToast('Nessuna disponibilita per il giorno selezionato')
    } else {
      const dataBooking = {
        booking: {
          'time_id': this.timeId,
          'date_id': this.dateId,
          'month_id': this.monthId,
          'year_id': this.yearId,
          'length': this.treatmentParam.duration,
          'from_where': 'android',
          'salon_id': this.salonParam.salon_id,
          'price': this.treatmentParam.price,
          'discount_price': this.treatmentParam.price,
          'operator_id': this.operators.operator_id,
          's_treatment_id': this.treatmentParam.s_treatment_id
        }
      }

      const dataOther = {
        'dayName': this.dayName,
        'monthName': this.monthName,
        'month': this.monthId,
        'date': this.dateId,
        'time': this.timeId,
        'year': this.yearId
      }

      this._navController.push(
        'HistoryBookingPage',
        {
          salon: this.salonParam,
          dataBooking: dataBooking,
          treatment: this.treatmentParam,
          operators: this.operators, dataOther: dataOther
        })
    }
  }

  back() {
    this._loaderCtrl.hideLoader();
    this.navCtrl.pop();
  }

  list(ev) {
    this.scrollStatus = 'no-scroll';
    const listModal = this._modalCtrl.create('ListPage')
    listModal.present();
  }
}
