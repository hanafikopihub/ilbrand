import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListCustomerTreatment } from '../list-customer-treatment/list-customer-treatment';
import { HomePage } from '../home/home';

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
  HomePage = HomePage;

  treatmentParam: any;
  operatorParam: any;
  dataBooking: any;
  dataOther: any;
  salon: any;
  optionPay: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.treatmentParam = this.navParams.get('treatment');
    this.operatorParam = this.navParams.get('operators');
    this.dataBooking = this.navParams.get('dataBooking');
    this.dataOther = this.navParams.get('dataOther');
    this.salon = this.navParams.get('salon');
    this.optionPay = this.navParams.get('optionPay');
  }

  ionViewDidLoad() {
  }
  toHomePage() {
    this.navCtrl.push(HomePage, {'status' : true})
  }
  toTreatmentUser() {
    this.navCtrl.push(ListCustomerTreatment)
  }
}
