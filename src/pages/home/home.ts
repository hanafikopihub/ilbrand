import { Component } from '@angular/core';

import { AppApi } from '../../app.api';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { AlertService } from '../../providers/shared-service/alert-service';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  salon_id: string;
  salon: object = null;
  fromModal: boolean = false;
  salon_header_name: string;
  isSignedIn: boolean;

  scrollStatus: string;

  constructor(
    private inAppBrowser: InAppBrowser,
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _alertCtrl: AlertService,
    public _loaderCtrl: LoaderService,
    public _modalCtrl: ModalController,
    public _events: Events,
    public _authServiceProvider: AuthServiceProvider,
    public _restapiServiceProvider: RestapiServiceProvider) {
    this.fromModal = this._navParams.get('status');

    _events.subscribe('page:scroll', (data) => {
      this.scrollStatus = data;
    });

    _events.subscribe('page:logged', (data) => {
      console.log(data);
      this.isSignedIn = data;
    });

    this.scrollStatus = 'can-scroll';

    this.getSalonId();
    this.loadData();
  }

  ionViewDidEnter() {
    if (this._authServiceProvider.currentAuthData === undefined || this._authServiceProvider.currentAuthData === null) {
      this.isSignedIn = false
    } else {
      this.isSignedIn = true
    }
  }

  // save salon_id in localstorage
  getSalonId() {
    this.salon_id = AppApi.SALON_ID;
    this.salon_header_name = AppApi.SALON_NAME_HEADER;
    localStorage.setItem('salon_header_name', JSON.stringify(this.salon_header_name));
    localStorage.setItem('salon_id', JSON.stringify(this.salon_id));
  }

  loadData() {
    this._loaderCtrl.showLoader().then(res => {
      this._restapiServiceProvider.getSalon(this.salon_id)
        .subscribe(data => {
          this._loaderCtrl.hideLoader();
          this.salon = data;
          localStorage.setItem('salon_object', JSON.stringify({name: data.name, 
            address: data.address, city: data.city, phone: data.phone, piva: data.piva, logo_image: data.logo_image, website: data.website}));
        }, (error) => {
          this._alertCtrl.failedError(error);
          this._loaderCtrl.hideLoader();
        });
    })
  }

  openWebpage(website){
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes'
    }

    this.inAppBrowser.create(website, '_self', options);
  }

  list(ev) {
    this.scrollStatus = 'no-scroll';
    const listModal = this._modalCtrl.create('ListPage')
    listModal.present();
  }

  goListTreatmentPage() {
    this._navCtrl.push('ListTreatmentPage');
  }

  goMyBookingPage() {
    this._navCtrl.push('ListCustomerTreatment');
  }

  goContactPage() {
    this._navCtrl.push('ContactPage');
  }
}
