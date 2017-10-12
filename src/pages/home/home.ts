import { Component } from '@angular/core';
import { ListPage } from '../list/list';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
  	public _navCtrl: NavController,
  	public _modalCtrl: ModalController) {

  }ent

  list(ev) {
    let listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }


}
