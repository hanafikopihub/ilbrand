import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { HistoryBookingPage } from '../history-booking/history-booking';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})

export class BookingPage {
  treatmentParam: any;
  hoursBooking:Array<any>;
  nameOperator:string;
  changeColorTime: string;
  changeColorDate: string;
  changeColorMonth: string;
  changeColorSelect: boolean;

  timeSet: string;
  time: any;
  date: any;
  dayName:any;
  monthName:any;
  month: any;
  year: any;
  dateFull: string;

  monthDisplay: any;

  times: Array<any>;
  months: Array<any>;
  dates: Array<any>;

  operators: any;

  setColorMonth: any;
  setColorDate: any;

  @ViewChild('sliderMonth') sliderMonth: Slides;
  @ViewChild('sliderMonth') test: Slides;
  @ViewChild('sliderDate') sliderDate: Slides;
  @ViewChild('sliderTime') sliderTime: Slides;

  constructor(
    public _authServiceProvider: AuthServiceProvider,
    public navParams: NavParams,
    public _navController: NavController,
    public _modalCtrl: ModalController,
    private toastCtrl: ToastController,
    public _restapiServiceProvider: RestapiServiceProvider) {

    this.treatmentParam = this.navParams.get('treatment');
    // Get Month Api
    this.getMonth();

    // Looping time per half hour
    this.setTimeLoop();

    // Starting Date now
    this.formatDate();
    this._restapiServiceProvider.getMonth(this.month, this.year)
      .subscribe(response => {
      })
    this.dates = [
      { "id": "1", "date": "01", "day": "Mercoledì", "shortDay": "Mer" },
      { "id": "2", "date": "02", "day": "Giovedi", "shortDay": "Gio" },
      { "id": "3", "date": "03", "day": "Venerdì", "shortDay": "Ven" },
      { "id": "4", "date": "04", "day": "Sabato", "shortDay": "Sab" },
      { "id": "5", "date": "05", "day": "Dominica", "shortDay": "Dom" },
      { "id": "6", "date": "06", "day": "Lunedi", "shortDay": "Lun" },
      { "id": "7", "date": "07", "day": "Martedì", "shortDay": "Mar" },
      { "id": "8", "date": "08", "day": "Mercoledì", "shortDay": "Mer" },
      { "id": "9", "date": "09", "day": "Giovedi", "shortDay": "Gio" },
      { "id": "10", "date": "10", "day": "Venerdì", "shortDay": "Ven" },
      { "id": "11", "date": "11", "day": "Sabato", "shortDay": "Sab" },
      { "id": "12", "date": "12", "day": "Dominica", "shortDay": "Dom" },
      { "id": "13", "date": "13", "day": "Lunedi", "shortDay": "Lun" },
      { "id": "14", "date": "14", "day": "Martedì", "shortDay": "Mar" },
      { "id": "15", "date": "15", "day": "Mercoledì", "shortDay": "Mer" },
      { "id": "16", "date": "16", "day": "Giovedi", "shortDay": "Gio" },
      { "id": "17", "date": "17", "day": "Venerdì", "shortDay": "Ven" },
      { "id": "18", "date": "18", "day": "Sabato", "shortDay": "Sab" },
      { "id": "19", "date": "19", "day": "Dominica", "shortDay": "Dom" },
      { "id": "20", "date": "20", "day": "Venerdì", "shortDay": "Ven" },
      { "id": "21", "date": "21", "day": "Sabato", "shortDay": "Sab" },
      { "id": "22", "date": "22", "day": "Dominica", "shortDay": "Dom" },
      { "id": "23", "date": "23", "day": "Lunedi", "shortDay": "Lun" },
      { "id": "24", "date": "24", "day": "Martedì", "shortDay": "Mar" },
      { "id": "25", "date": "25", "day": "Mercoledì", "shortDay": "Mer" },
      { "id": "26", "date": "26", "day": "Giovedi", "shortDay": "Gio" },
      { "id": "27", "date": "27", "day": "Venerdì", "shortDay": "Ven" },
      { "id": "28", "date": "28", "day": "Sabato", "shortDay": "Sab" },
      { "id": "29", "date": "29", "day": "Dominica", "shortDay": "Dom" },
      { "id": "30", "date": "28", "day": "Sabato", "shortDay": "Sab" },
      { "id": "31", "date": "29", "day": "Dominica", "shortDay": "Dom" }
    ]

    this.setOperator();
  }


  ionViewDidEnter() {
    // this.sliderex.slideTo(2, 500);
    this.sliderMonth.slideTo(this.month - 1, 500);
    this.sliderDate.slideTo(this.date - 1, 500);
    this.setColorMonth = this.month;
    this.changeColorMonth = this.month;
    this.setColorDate = this.date;
    this.changeColorDate = this.date;

  }

  ionViewDidLoad() {
    this.sliderMonth.centeredSlides = true
    this.sliderMonth.slidesPerView = 3
    this.sliderDate.centeredSlides = true
    this.sliderDate.slidesPerView = 3
    this.sliderTime.centeredSlides = true
    this.sliderTime.slidesPerView = 3

  }

  getMonth() {
    this._restapiServiceProvider.getMonths()
      .subscribe(response => {
        this.months = response.data
      },
      (error) => {
        // handle error
      })
  }

  setTimeLoop() {
    const quarterHours = ['00', '30'];
    const times = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 2; j++) {
        let hour: string = i.toString();
        if (hour.length < 2) {
          hour = `0${hour}`;
        }
        times.push(hour + ':' + quarterHours[j]);
      }
    }
    this.times = times.map(o => {
      return {
        label: o,
        value: o
      };
    });
  }

  formatDate() {
    const d = new Date();
    
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    this.year = '' + d.getFullYear();

    this.date = day;
    this.month = month;
    this.dayName = days[d.getDay()];
    this.monthName = monthNames[d.getMonth()];

    // if (this.date.length < 2) { this.dateDisplay = '0' + this.date; }

    // if (this.month.length < 2) {
    //   this.monthDisplay = '0' + this.month;
    // }
    // else {
    //   this.monthDisplay = this.month;
    // }
  }

  onClickMonth(month) {
    this.monthName = month.name;
    this.setColorMonth = 'false';
    this.month = month.value;
    this.dates = month.date;
    this.changeColorMonth = month.value;
    this.setOperator();
  }

  onClickDate(date) {
    this.setColorDate = 'false';
    this.date = date.date;
    this.dayName = date.day;
    this.changeColorDate = date.id;
    this.setOperator();
  }

  onClickTime(time) {
    this.changeColorTime = time;
    this.timeSet = time
  }

  setOperator() {

    this.dateFull = this.date + '/' + this.month + '/' + this.year

    const treatmentGetOperator = [{ "treatment_id": this.treatmentParam.s_treatment_id, "duration": this.treatmentParam.duration }]
    
    let data = { "when": this.dateFull, "treatments": treatmentGetOperator }

    this._restapiServiceProvider.getOperator(data).subscribe(response => {
      if(response.operators[0].operators.length == 0) {
        this.nameOperator = null;
        this.hoursBooking = null;
        this.operators =null;
        return this.presentToast('Nessuna disponibilita per il giorno selezionato');
      }
      this.operators = response.operators[0].operators[0]
      this.hoursBooking = response.operators[0].operators[0].hours
      this.nameOperator = response.operators[0].operators[0].operator_name
      
    }, (error) => {
    })
  }

  list(ev) {
    let listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }

  onChangeSelect() {
    this.changeColorSelect = true;
  }

  onSumbit() {
    if (this.operators == null) {
      return this.presentToast('Nessuna disponibilita per il giorno selezionato');
    }
    else {
      const treatments = JSON.parse(localStorage.getItem("treatments"));
      const durationDate = this.treatmentParam.duration
      const operator_id = this.operators.operator_id
      const s_treatment_id = this.treatmentParam.s_treatment_id


      const startDate = this.year + '.' + this.month + '.' + this.date + ' ' + this.timeSet;

      const startDateTime = new Date(startDate).getTime() / 1000
      const endDateTime = startDateTime + durationDate

      const dataBooking = { booking: { "salon_id": 604, length: durationDate, "start": startDateTime, "end": endDateTime, "from_where": "android", "user_id": this._authServiceProvider.currentUserData.uid, "operator_id": operator_id, "s_treatment_id": s_treatment_id } }

      const dataOther = { "dayName": this.dayName,"monthName": this.monthName, "date": this.date, "time": this.timeSet, "year": this.year }
      
      if ( this.timeSet == null) {
        return this.presentToast('Nessuna disponibilita per il giorno selezionato');
      }
      this._navController.push(HistoryBookingPage, {dataBooking: dataBooking, treatment:this.treatmentParam, operators: this.operators, dataOther: dataOther})


    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}

