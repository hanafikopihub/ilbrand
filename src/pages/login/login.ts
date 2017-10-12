import { Component } from '@angular/core';
import { ModalController, NavController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
  	public navCtrl: NavController,
  	public _modalController: ModalController,
  	public _viewController: ViewController) {

  }

  closeModal() {
    this._viewController.dismiss();
  }
}
