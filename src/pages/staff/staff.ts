import { Component } from '@angular/core';
import { ViewController, NavController, ModalController } from 'ionic-angular';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html'
})
export class StaffPage {

  constructor(
    public navCtrl: NavController,
    public _modalCtrl: ModalController,
    public _viewController: ViewController) {

  }

  list(ev) {
    const listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }

}
