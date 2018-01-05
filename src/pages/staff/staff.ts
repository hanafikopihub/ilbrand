import { Component } from '@angular/core';
import { ViewController, NavController, ModalController } from 'ionic-angular';

import { AlertService } from '../../providers/shared-service/alert-service';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html'
})
export class StaffPage {

  salon_id: string;
  staff: object;
  constructor(
    public _loaderCtrl: LoaderService,
    public navCtrl: NavController,
    public _alertCtrl: AlertService,
    public _restapiServiceProvider: RestapiServiceProvider,
    public _modalCtrl: ModalController,
    public _viewController: ViewController) {
    this.salon_id = JSON.parse(localStorage.getItem('salon_id'));

  }
  ionViewDidLoad() {
    this.getDataSalon();
  }

  getDataSalon() {
    this._loaderCtrl.showLoader().then(res => {
      this._restapiServiceProvider.getSalon(this.salon_id)
        .subscribe(data => {
          this._loaderCtrl.hideLoader();
          this.staff = data;
        }, (error) => {
          this._loaderCtrl.hideLoader();
          this._alertCtrl.failedError(error);
        });
    })
  }

  list(ev) {
    const listModal = this._modalCtrl.create('ListPage')
    listModal.present();
  }

}
