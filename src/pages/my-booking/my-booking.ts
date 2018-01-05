import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Calendar } from '@ionic-native/calendar';
import { ToastService } from '../../providers/shared-service/toast-service';

/**
 * Generated class for the MyBookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-my-booking',
  templateUrl: 'my-booking.html',
})
export class MyBookingPage {

  treatmentParam: any;
  operatorParam: any;
  dataBooking: any;
  dataOther: any;
  salon: any;
  optionPay: any;

  constructor(
    private _calendar: Calendar,
    public navCtrl: NavController,
    public _toastService: ToastService,
    public navParams: NavParams) {

    this.treatmentParam = this.navParams.get('treatment');
    this.operatorParam = this.navParams.get('operators');
    this.dataBooking = this.navParams.get('dataBooking');
    this.dataOther = this.navParams.get('dataOther');
    this.salon = this.navParams.get('salon');
    this.optionPay = this.navParams.get('optionPay');

    if (this.optionPay === 'Paga in salone') {
      this.optionPay = 'Pagherai in salone'
    }
  }

  toHomePage() {
    this.navCtrl.push('HomePage', { 'status': true })
  }
  SaveToCalendar() {
    this.dataOther.month = this.dataOther.month.toString()
    if (this.dataOther.month.length < 2) {
      this.dataOther.month = `0${this.dataOther.month}`;
    }
    const dateString = this.dataOther.year + '-' + this.dataOther.month + '-' + this.dataOther.date + 'T' + this.dataOther.time + ':00'
    const title = this.treatmentParam.des_treatment + ' (' + (this.treatmentParam.duration / 60) + ' min)';
    const location = this.salon.address + ', ' + this.salon.city;
    const startDate = new Date(dateString);
    const notes = this.treatmentParam.des_treatment + ' (' + (this.treatmentParam.duration / 60) + 'min) da ' + location;
    const endDate = new Date(startDate.getTime() + this.treatmentParam.duration * 1000);
    this._calendar.createEvent(title, location, notes, startDate, endDate)
      .then(success => {
        this._toastService.successToast('Abbiamo inserito i dati della prenotazione nel tuo calendario')
      },
      (error) => {
        this._toastService.errorToast('Qualcosa non va, per favore riprova più tardi!')
      })
  }
}
