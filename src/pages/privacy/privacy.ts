import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, ModalController, Events } from 'ionic-angular';
import { LoaderService } from '../../providers/shared-service/loader-service';

@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {

  scrollStatus: string;

  constructor(
    public _platform: Platform,
    public _loaderService: LoaderService,
    public _events: Events,
    public _modalCtrl: ModalController,
    public _navController: NavController) {
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


  list(ev) {
    this.scrollStatus = 'no-scroll';
    const listModal = this._modalCtrl.create('ListPage')
    listModal.present();
  }
}
