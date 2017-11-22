import { Component } from '@angular/core';
import { ListPage } from '../list/list';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ListTreatmentPage } from '../list-treatment/list-treatment';

import { AppApi } from '../../app.api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fromModal: boolean = false;
  ListTreatmentPage = ListTreatmentPage;
  constructor(
    public _navParams: NavParams,
    public _navCtrl: NavController,
    public _modalCtrl: ModalController) {
      this.fromModal = this._navParams.get('status');
      this.getSalonId();
  }

  getSalonId() {
    const salon_id = AppApi.SALON_ID;
    localStorage.setItem('salon_id', JSON.stringify(salon_id))
  }

  list(ev) {
    const listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }
}
