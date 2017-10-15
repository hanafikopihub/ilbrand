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
  customerTreatment = ListCustomerTreatment;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBookingPage');
  }

}
