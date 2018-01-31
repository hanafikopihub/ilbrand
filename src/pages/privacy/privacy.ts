import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, ModalController, Events } from 'ionic-angular';
import { LoaderService } from '../../providers/shared-service/loader-service';

import { AppApi } from '../../app.api';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {

  salon_header_name: string;
  scrollStatus: string;
  salon: object = null;

  constructor(
    private inAppBrowser: InAppBrowser,
    public _platform: Platform,
    public _loaderService: LoaderService,
    public _events: Events,
    public _modalCtrl: ModalController,
    public _navController: NavController) {

    this.salon_header_name = AppApi.SALON_NAME_HEADER;
    
    this.salon = JSON.parse(localStorage.getItem('salon_object'));
    this.scrollStatus = 'can-scroll';
    _events.subscribe('page:scroll', (data) => {
      this.scrollStatus = data;
    });
  }

  ionViewDidLoad() {
    this._platform.ready().then(() => {
      this._platform.registerBackButtonAction(() => this.back());
    })
  }

  back() {
    this._loaderService.showLoader().then(response => {
      this._loaderService.hideLoader();
      this._navController.pop();
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
}
