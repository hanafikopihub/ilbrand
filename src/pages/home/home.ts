import { Component } from '@angular/core';

import { AppApi } from '../../app.api';
import { ListPage } from '../list/list';
import { ListTreatmentPage } from '../list-treatment/list-treatment';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertService } from '../../providers/shared-service/alert-service';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  salon_id: string;
  salon: object;
  fromModal: boolean = false;
  ListTreatmentPage = ListTreatmentPage;
  constructor(
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _alertCtrl: AlertService,
    public _loaderCtrl: LoaderService,
    public _modalCtrl: ModalController,
    public _restapiServiceProvider: RestapiServiceProvider) {
    this.fromModal = this._navParams.get('status');
    this.getSalonId();
    this.loadData();
  }

  // save salon_id in localstorage
  getSalonId() {
    this.salon_id = AppApi.SALON_ID;
    localStorage.setItem('salon_id', JSON.stringify(this.salon_id))
  }

  loadData() {
    this._loaderCtrl.showLoader().then(res => {
      this._restapiServiceProvider.getSalon(this.salon_id)
        .subscribe(data => {
          this._loaderCtrl.hideLoader();
          this.salon = data;
        }, (error) => {
          this._alertCtrl.failedError(error);
          this._loaderCtrl.hideLoader();
        });
    })
  }

  list(ev) {
    const listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }
}
