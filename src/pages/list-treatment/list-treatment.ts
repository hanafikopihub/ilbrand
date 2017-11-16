import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { BookingPage } from '../booking/booking';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { AlertService } from '../../providers/shared-service/alert-service';

@Component({
  selector: 'page-list-treatment',
  templateUrl: 'list-treatment.html'
})
export class ListTreatmentPage {
  salon_id: string;
  fromModal: boolean = false;
  treatments: Array<any>
  addTreatments: Array<any> = [];
  constructor(
    public _alertCtrl: AlertService,
    public _loaderCtrl: LoaderService,
    public _navCtrl: NavController,
    public _navParams: NavParams,
    public _modalCtrl: ModalController,
    public _restapiServiceProvider: RestapiServiceProvider) {

    this.salon_id = JSON.parse(localStorage.getItem('salon_id'));

    this.fromModal = this._navParams.get('status');
    this.loadData();
  }

  list(ev) {
    const listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }

  loadData() {
    this._loaderCtrl.showLoader();
    this._restapiServiceProvider.getSalon(this.salon_id)
      .subscribe(data => {
        localStorage.setItem('salon', JSON.stringify(data))
        this.treatments = data.treatments;
        this._loaderCtrl.hideLoader();
      }, (error) => {
        this._alertCtrl.failedError(error);
        this._loaderCtrl.hideLoader();
      });
  }

  addTreatment(treatment) {
    this.addTreatments = this.addTreatments.concat(treatment)

    this._navCtrl.push(BookingPage, { treatment: treatment });
  }

  addToCart() {
    const treatmentls = JSON.parse(localStorage.getItem('treatments'));
    if (treatmentls != null) {

      this.addTreatments = this.addTreatments.concat(treatmentls);
    }
    localStorage.setItem('treatments', JSON.stringify(this.addTreatments))
    this.addTreatments = [];
    // this._navCtrl.setRoot
    this._navCtrl.push(BookingPage);
  }
}

