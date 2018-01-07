import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  selector: 'page-phone-salon',
  templateUrl: 'phone-salon.html',
})
export class PhoneSalonPage {
  constructor(
    public _navCtrl: NavController,
    public _navParams: NavParams,
    public _viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this._viewCtrl.dismiss();
  }

}
