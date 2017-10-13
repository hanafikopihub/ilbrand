import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})

export class BookingPage {

  changeColorTime: string;
  changeColorDate: string;
  changeColorMonth: string;

  time: any;
  date: any;
  month: any;

  dateDisplay: any;
  monthDisplay: any;

  times: Array<any>;
  months: Array<any>;
  dates: Array<any>;


  setColorMonth: any;
  setColorDate: any;

  @ViewChild('sliderMonth') sliderMonth: Slides;
  @ViewChild('sliderMonth') test: Slides;
  @ViewChild('sliderDate') sliderDate: Slides;
  @ViewChild('sliderTime') sliderTime: Slides;

  constructor(
    public _restapiServiceProvider: RestapiServiceProvider) {

    // Get Month Api
    this.getMonth();

    // Looping time per half hour
    this.setTimeLoop();

    // Starting Date now
    this.formatDate();

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
      { "id": "29", "date": "29", "day": "Dominica", "shortDay": "Dom" }
    ]
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

  slideChanged() {
    const x = this.sliderMonth.isEnd();
    if (x) {
      alert('this last slide')
    }
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
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    this.date = day;
    this.month = month;

    if (this.date.length < 2) { this.dateDisplay = '0' + this.date; }

    if (this.month.length < 2) {
      this.monthDisplay = '0' + this.month;
    }
    else {
      this.monthDisplay = this.month;
    }
  }

  onClickMonth(month) {
    this.setColorMonth = 'false';
    this.monthDisplay = month.value;
    this.dates = month.date;
    this.changeColorMonth = month.value;
  }

  onClickDate(date) {
    this.setColorDate = 'false';
    this.dateDisplay = date.date;
    this.changeColorDate = date.id;
  }

  onClickTime(time) {
    this.changeColorTime = time.value;
    this.time = time.value;
  }

  onSumbit(){
    let data = { booking: {"salon_id":604,"start":"1508297400","end":"1508301000","tag":"booking","length":"3600","dt_insert":"1507886883","treatment_id":"236","s_treatment_id":"13043","pprice":"30.0"}
                }
    this._restapiServiceProvider.postBooking(data).subscribe(response=>{
      debugger
    },(error)=>{
      debugger
    })
  }
}
