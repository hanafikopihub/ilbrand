import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ListCustomerTreatment } from '../list-customer-treatment/list-customer-treatment';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';

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

  customerTreatment = ListCustomerTreatment ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public _modalCtrl: ModalController) {

    this.treatmentParam = this.navParams.get('treatment');
    this.operatorParam = this.navParams.get('operators');
    this.dataBooking = this.navParams.get('dataBooking');
    this.dataOther = this.navParams.get('dataOther');
    this.salon = this.navParams.get('salon');
    this.optionPay = this.navParams.get('optionPay');
  }

  list(ev) {
    const listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBookingPage');
  }

}
