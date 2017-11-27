import { Component, ViewChild } from '@angular/core';
import { NavParams, NavController, Navbar, LoadingController, ModalController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { LoginPage } from '../login/login';

import { PastBookingPage } from './past-booking/past-booking';
import { ActiveBookingPage } from './active-booking/active-booking';

@Component({
  selector: 'page-list-customer-treatment',
  templateUrl: 'list-customer-treatment.html'
})
export class ListCustomerTreatment {
  treatments: Array<any>;
  activeTreatment: Array<any>;
  pastTreatment: Array<any>;
  treatment_count: number;
  name: string;
  isSignedIn: boolean;
  user_id: any;
  @ViewChild('navbar') navBar: Navbar;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public _authServiceProvider: AuthServiceProvider,
    public _loaderCtrl: LoaderService,
    public _restapiServiceProvider: RestapiServiceProvider,
    public loading: LoadingController) {
    this.isSignedIn = this._authServiceProvider.userSignedIn;

  }

  ionViewDidEnter() {
    const client = localStorage.getItem('client');
    if (client !== null && this._authServiceProvider.currentAuthData !== null) {
      this.listTreatment();
    } else {
      this.presentLogin('ListCustomerTreatment');
    }

    // this.navBar.backButtonClick = () => {
    //   alert('hhahah')
    // };
  }

  goToActiveDetailBooking(booking) {
    this.navCtrl.push(ActiveBookingPage, {
      booking: booking
    });
  }

  goToPastDetailBooking(booking) {
    this.navCtrl.push(PastBookingPage, {
      booking: booking
    });
  }

  listTreatment() {
    this._loaderCtrl.showLoader();
    this._restapiServiceProvider.getMyBooking()
      .subscribe(response => {
        this._loaderCtrl.hideLoader();
        this.name = response.name;
        this.activeTreatment = response.bookings.filter(item => item.active_status);
        this.pastTreatment = response.bookings.filter(item => !item.active_status);
        this.treatment_count = response.total_booking;
      }, (error) => {
        this._loaderCtrl.hideLoader();
      })
  }

  detailTreatment(treatment) {

  }

  presentLogin(fromPage) {
    this.navCtrl.push(LoginPage, { 'fromPage': fromPage });
  }

}
