import { Component, ViewChild } from '@angular/core';
import {
  ModalController,
  NavController,
  NavParams,
  Slides
} from 'ionic-angular';

// libary local
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HistoryBookingPage } from '../history-booking/history-booking';
import { LoginPage } from '../login/login';
import { ListPage } from '../list/list';
import { ProfilePage } from '../profile/profile';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { AlertService } from '../../providers/shared-service/alert-service';
import { ToastService } from '../../providers/shared-service/toast-service';
import { LoaderService } from '../../providers/shared-service/loader-service';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})

export class BookingPage {

  // Routes
  HistoryBookingPage = HistoryBookingPage;

  // status user login or logout
  public isSignedIn: boolean;

  // general variable
  salonParam: any;
  treatmentParam: any;
  operators: any;
  nameOperator: any;

  // variable for modification style
  changeColorTime: any;
  changeColorDate: any;
  changeColorMonth: any;
  setColorMonth: any;
  setColorDate: any;

  // time variable date
  times: Array<any>;
  months: Array<any>;
  dates: Array<any>;
  timeId: string;
  dateId: string;
  monthId: string;
  yearId: string;
  dayName: any;
  monthName: any;

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
    public _restapiServiceProvider: RestapiServiceProvider,
  ) {

    this.months = [
      { "month": "month" },
      { "month": "month" },
      { "month": "month" }
    ];

    this.dates = [
      { "date": 1, "day": "Day", "shortDay": "Day" },
      { "date": 2, "day": "Day", "shortDay": "Day" },
      { "date": 3, "day": "Day", "shortDay": "Day" }]

    // sign login or logout
    this.isSignedIn = this._authServiceProvider.userSignedIn

    // get data from paramater
    this.salonParam = this._navParams.get('salon');
    this.treatmentParam = this._navParams.get('treatment');

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
    this.sliderTime.centeredSlides = false;

    this.getMonths();
  }

  ionViewDidLoad() {
    this.sliderMonth.slidesPerView = 3;
    this.sliderDate.slidesPerView = 3;
    this.sliderTime.slidesPerView = 3;
  }

  // get month during 1 year
  getMonths() {
    debugger
    this._restapiServiceProvider.getMonths()
      .subscribe(response => {

        this.dates = response.days;
        this.months = response.months;
        this.monthName = response.months[0].month; // month date display

        this.dateId = response.days[0].date;
        this.monthId = response.months[0].month_id;
        this.yearId = response.months[0].year;
        this.setOperator(this.dateId, this.monthId, this.yearId)

      },
      (error) => {
        // handle error
        return this._toastCtrl.presentToast('non è riuscito a ottenere dati');
      })
  }

  onClickMonth(month) {
    this._loaderCtrl.showLoader();
    this.monthId = month.month_id
    this.sliderDate.centeredSlides = false
    this._restapiServiceProvider.getMonth(month.month_id, month.year)
      .subscribe(response => {
        this._loaderCtrl.hideLoader();
        this.dates = response.days; // get data array from api
        this.monthName = month.month; // month date display
        this.changeColorMonth = month.id;

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
        this._loaderCtrl.hideLoader();
        return this._toastCtrl.presentToast('non è possibile ottenere mese da api');
      })

  }

  onClickDate(date) {
    this.changeColorTime = 'false';
    this.timeId = undefined;
    this.setColorDate = 'false';
    this.dateId = date.date;
    this.dayName = date.day;
    this.changeColorDate = date.id;
    this.setOperator(this.dateId, this.monthId, this.yearId)
  }

  onClickTime(time) {
    this.changeColorTime = time;
    this.timeId = time
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

      if (response.operators[0].operators.length === 0) {
        this.operators = null;
        this.times = null;
        this.nameOperator = null;
        return this._toastCtrl.presentToast('Nessuna disponibilita per il giorno selezionato')
      } else {
        this.operators = response.operators[0].operators[0]
        this.times = response.operators[0].operators[0].hours
        this.nameOperator = response.operators[0].operators[0].operator_name
      }

    }, (error) => {
      this._loaderCtrl.hideLoader();
      return this._toastCtrl.presentToast('non è riuscito a ottenere dati');
    })
  }

  presentLogin(event) {
    const loginModal = this._modalCtrl.create(LoginPage)
    loginModal.present();
  }

  presentProfile(event) {
    const profileModal = this._modalCtrl.create(ProfilePage)
    profileModal.present();
  }

  onSumbit() {
    if (this._authServiceProvider.userSignedIn) {

      if (this.operators == null || this.timeId === undefined || this.dateId === undefined) {
        return this._toastCtrl.presentToast('Nessuna disponibilita per il giorno selezionato')
      } else {

        const datetime = this.yearId + '.' + this.monthId + '.' + this.dateId;
        const datetimeTp = new Date(datetime).getTime() / 1000
        const start = datetime + ' ' + this.timeId;
        const startDateTp = new Date(start).getTime() / 1000
        const endDateTime = datetimeTp + this.treatmentParam.duration;

        const dataBooking = {
          booking: {
            'start': startDateTp,
            'length': this.treatmentParam.duration,
            'end': endDateTime,
            'from_where': 'android',
            'salon_id': 604,
            'price': this.treatmentParam.price,
            'discount_price': this.treatmentParam.price,
            'operator_id': this.operators.operator_id,
            's_treatment_id': this.treatmentParam.s_treatment_id,
            'user_id': this._authServiceProvider.currentAuthData.uid
          }
        }

        const dataOther = {
          'dayName': this.dayName,
          'monthName': this.monthName,
          'date': this.dateId,
          'time': this.timeId,
          'year': this.yearId
        }

        this._navController.push(
          HistoryBookingPage,
          {
            salon: this.salonParam,
            dataBooking: dataBooking,
            treatment: this.treatmentParam,
            operators: this.operators, dataOther: dataOther
          })
      }
    } else {
      this._alertService.mustLoginAlert();
    }
  }

  list(ev) {
    let listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }

}
