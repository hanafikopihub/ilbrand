import { Component } from '@angular/core';
import { Events, ViewController, NavController, ModalController } from 'ionic-angular';

import { AlertService } from '../../providers/shared-service/alert-service';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { AppApi } from '../../app.api';

@IonicPage()
@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html'
})
export class StaffPage {

  salon_header_name: string;
  salon_id: string;
  staff: object;
  staffs: Array<any>;
  scrollStatus: string;
  salon: object = null;

  constructor(
    private inAppBrowser: InAppBrowser,
    public _loaderCtrl: LoaderService,
    public navCtrl: NavController,
    public _alertCtrl: AlertService,
    public _restapiServiceProvider: RestapiServiceProvider,
    public _modalCtrl: ModalController,
    public _events: Events,
    public _viewController: ViewController) {

    this.salon_header_name = AppApi.SALON_NAME_HEADER;
    _events.subscribe('page:scroll', (data) => {
      this.scrollStatus = data;
    });

    this.scrollStatus = 'can-scroll';
    this.salon_id = JSON.parse(localStorage.getItem('salon_id'));
    this.salon = JSON.parse(localStorage.getItem('salon_object'));
  }
  ionViewDidLoad() {
    this.getDataSalon();
  }

  getDataSalon() {
    this._loaderCtrl.showLoader().then(res => {
      this._restapiServiceProvider.getListOperator(this.salon_id)
        .subscribe(data => {
          this._loaderCtrl.hideLoader();
          this.staffs = data.operators;
        }, (error) => {
          this._loaderCtrl.hideLoader();
          this._alertCtrl.failedError(error);
        });
    })
  }

  list(ev) {
    this.scrollStatus = 'no-scroll';
    const listModal = this._modalCtrl.create('ListPage')
    listModal.present();
  }

  openWebpage(website){
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes'
    }
    this.inAppBrowser.create(website, '_self', options);
  }

}
