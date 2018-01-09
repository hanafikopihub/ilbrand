import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  ModalController,
  NavController,
  NavParams,
  Slides
} from 'ionic-angular';

// libary page
import { AlertService } from '../../providers/shared-service/alert-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HistoryBookingPage } from '../history-booking/history-booking';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { ToastService } from '../../providers/shared-service/toast-service';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})

export class BookingPage {

  // Routes
  HistoryBookingPage = HistoryBookingPage;

  // status user login or logout
  public isSignedIn: boolean;

  fromModal: boolean = false;

  // general variable
  salonParam: any;
  treatmentParam: any;
  operators: any;
  nameOperator: any;
  nameOperatorClick: any;

  // variable for modification style
  changeColorTime: any;
  changeColorDate: any;
  changeColorMonth: any;
  setColorMonth: any;
  setColorDate: any;

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
  salon_id: any;
  hideTime: boolean = false;

  // button flowing
  ionScroll: any;
  showheader: boolean;
  hideheader: boolean;

  @ViewChild('sliderMonth') sliderMonth: Slides;
  @ViewChild('sliderDate') sliderDate: Slides;
  @ViewChild('sliderTime') sliderTime: Slides;

  constructor(
    private _toastCtrl: ToastService,
    public _alertService: AlertService,
    public _authServiceProvider: AuthServiceProvider,
    public _loaderCtrl: LoaderService,
    public _modalCtrl: ModalController,
    public _navController: NavController,
    public _navParams: NavParams,
    public _myElement: ElementRef,
    public _restapiServiceProvider: RestapiServiceProvider,
  ) {

    this.showheader = false;
    this.hideheader = true;

    // sign login or logout
    this.isSignedIn = this._authServiceProvider.userSignedIn

    // get data from paramater
    this.salonParam = this._navParams.get('salon');
    this.treatmentParam = this._navParams.get('treatment');
    this.salon_id = JSON.parse(localStorage.getItem('salon_id'));
    this.fromModal = this._navParams.get('status');
  }

  // load this function although callback button from next page
  ionViewDidEnter() {

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

  ngOnInit() {
    // Ionic scroll element
    this.ionScroll = this._myElement.nativeElement.getElementsByClassName('scroll-content')[0];
    // On scroll function
    this.ionScroll.addEventListener('scroll', () => {
      this.showheader = false;
      this.hideheader = true;
    });
  }

  ionViewDidLoad() {
    this.sliderMonth.slidesPerView = 3.4;
    this.sliderDate.slidesPerView = 3.4;
    if (this.sliderTime !== undefined) {
      this.sliderTime.slidesPerView = 3;
    }
  }

  // get month during 1 year
  getMonths() {
    this._loaderCtrl.showLoader().then(res => {
      this._restapiServiceProvider.getMonths()
        .subscribe(response => {
          this._loaderCtrl.hideLoader();

          this.dates = response.days;
          this.months = response.months;

          this.dayName = response.days[0].day;
          this.monthName = response.months[0].month;

          this.dateId = response.days[0].date;
          this.monthId = response.months[0].month_id;
          this.yearId = response.months[0].year;

          this.setOperator(this.dateId, this.monthId, this.yearId)
        },
        (error) => {
          this._loaderCtrl.hideLoader();
          return this._toastCtrl.presentToast('non è riuscito a ottenere dati');
        })
    });
  }

  // set object data for passing to get treatment
  setOperator(dateId, monthId, yearId) {

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
    this._loaderCtrl.showLoader().then(res => {
      this._restapiServiceProvider.getOperator(data).subscribe(response => {
        this._loaderCtrl.hideLoader();
        this.operatorArray = response.operators[0].operators;
        if (response.operators[0].operators.length === 0) {
          this.operators = null;
          this.times = null;
          this.nameOperator = null;
          
          return this._toastCtrl.presentToast('Nessuna disponibilità per il giorno selezionato')
        } else {
          // this.operators = response.operators[0].operators[0]
          // this.times = response.operators[0].operators[0].hours
          // this.nameOperator = response.operators[0].operators[0].operator_name
        }

      }, (error) => {
        this._loaderCtrl.hideLoader();
        return this._toastCtrl.presentToast('non è riuscito a ottenere dati');
      })
    })
  }

  // ----------------------------Event Click-------------------------------------

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
    this.timeId = time.hour

    this.showheader = true;
    this.hideheader = false;
  }


  postOperator(operator) {
    this.operators = operator;
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
          'salon_id': this.salon_id,
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
          operators: this.operators, dataOther: dataOther,
          status: this.fromModal
        })
    }
  }

  list(ev) {
    const listModal = this._modalCtrl.create('ListPage')
    listModal.present();
  }

}
