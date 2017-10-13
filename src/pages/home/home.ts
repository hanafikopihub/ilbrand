import { Component } from '@angular/core';
import { ListPage } from '../list/list';
import { NavController, ModalController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ListTreatmentPage } from '../list-treatment/list-treatment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ListTreatmentPage = ListTreatmentPage;
  constructor(
    public _navCtrl: NavController,
    public _modalCtrl: ModalController) {
  }

  list(ev) {
    let listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }
}
