import { Component } from '@angular/core';
import { Events, ModalController, NavController, NavParams } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { AlertService } from '../../providers/shared-service/alert-service';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { AppApi } from '../../app.api';

import groupArray from 'group-array';

@IonicPage()
@Component({
  selector: 'page-list-treatment',
  templateUrl: 'list-treatment.html'
})
export class ListTreatmentPage {
  salon_header_name: string;
  salon: any;
  salon_id: string;
  fromModal: boolean = false;
  scrollStatus: string;
  categoryTreatments: String[];
  treatments: Array<any>
  addTreatments: Array<any> = [];
  constructor(
    private inAppBrowser: InAppBrowser,
    public _alertCtrl: AlertService,
    public _loaderCtrl: LoaderService,
    public _navCtrl: NavController,
    public _navParams: NavParams,
    public _events: Events,
    public _modalCtrl: ModalController,
    public _restapiServiceProvider: RestapiServiceProvider) {

      this.salon_header_name = AppApi.SALON_NAME_HEADER;

    _events.subscribe('page:scroll', (data) => {
      this.scrollStatus = data;
    });

    this.scrollStatus = 'can-scroll';
    this.salon_id = JSON.parse(localStorage.getItem('salon_id'));
    this.fromModal = this._navParams.get('status');
    this.loadData();
  }

  list(ev) {
    this.scrollStatus = 'no-scroll';
    const listModal = this._modalCtrl.create('ListPage')
    listModal.present();
  }

  loadData() {
    this._loaderCtrl.showLoader().then(res => {
      this._restapiServiceProvider.getSalon(this.salon_id)
        .subscribe(data => {
          this._loaderCtrl.hideLoader();
          this.salon = data;
          this.treatments = data.treatments;

          var groupByPreferred = groupArray(this.treatments, 'preferred_status');
          this.treatments = groupArray(groupByPreferred.nonFavorite, 'service_name');

          if(groupByPreferred.favorite !== undefined){
            this.treatments = Object.assign({'I Più Prenotati': groupByPreferred.favorite}, this.treatments);
          }

          this.categoryTreatments = Object.keys(this.treatments);

          localStorage.setItem('salon', JSON.stringify(data));
        }, (error) => {
          this._alertCtrl.failedError(error);
          this._loaderCtrl.hideLoader();
        });
    })
  }

  openWebpage(website){
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes'
    }

    this.inAppBrowser.create(website, '_self', options);
  }

  addTreatment(treatment) {
    this.addTreatments = this.addTreatments.concat(treatment)
    this._navCtrl.push('BookingPage', { treatment: treatment, salon: this.salon, status: this.fromModal });
  }

  addToCart() {
    const treatmentls = JSON.parse(localStorage.getItem('treatments'));
    if (treatmentls != null) {
      this.addTreatments = this.addTreatments.concat(treatmentls);
    }
    localStorage.setItem('treatments', JSON.stringify(this.addTreatments))
    this.addTreatments = [];
    this._navCtrl.push('BookingPage');
  }

  showPhone() {
    const phoneSalon = this._modalCtrl.create('PhoneSalonPage');
    phoneSalon.present();
  }
}

