import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { ViewController, NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
LoginPage = LoginPage;
  constructor(
  	public _navCtrl: NavController,
  	public _modalController: ModalController,
  	public _viewController: ViewController) {

  }

  goLogin(ev) {
    let loginModal = this._modalController.create(LoginPage)
    loginModal.present();
  }

  closeModal() {
    this._viewController.dismiss();
  }
}
