import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListCustomerTreatment } from '../list-customer-treatment/list-customer-treatment';
import { HomePage } from '../home/home';

/**
 * Generated class for the MyBookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-booking',
  templateUrl: 'my-booking.html',
})
export class MyBookingPage {
  HomePage = HomePage;

  treatmentParam:any;
  operatorParam:any;
  dataBooking:any;
  dataOther:any;

  customerTreatment = ListCustomerTreatment;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
        
    this.treatmentParam = this.navParams.get('treatment');
    this.operatorParam = this.navParams.get('operators');
    this.dataBooking = this.navParams.get('dataBooking');
    this.dataOther = this.navParams.get('dataOther');
    debugger;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBookingPage');
  }

}
