import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoaderService } from '../../providers/shared-service/loader-service';
import { NavController, ViewController, ModalController, Events } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { AlertService } from '../../providers/shared-service/alert-service';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { AppApi } from '../../app.api';

declare var google;

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild('map') mapElement: ElementRef;
  salon_header_name: string;
  map: any;
  salon_id: string;
  salon: object = null;
  contact: object;
  scrollStatus: string;

  constructor(
    private inAppBrowser: InAppBrowser,
    public _loaderCtrl: LoaderService,
    public navCtrl: NavController,
    public _viewController: ViewController,
    public _alertCtrl: AlertService,
    public _events: Events,
    public _restapiServiceProvider: RestapiServiceProvider,
    public _modalCtrl: ModalController) {
    this.salon_header_name = AppApi.SALON_NAME_HEADER;

    this.salon_id = JSON.parse(localStorage.getItem('salon_id'));
    this.salon = JSON.parse(localStorage.getItem('salon_object'));
    this.scrollStatus = 'can-scroll';
    _events.subscribe('page:scroll', (data) => {
      this.scrollStatus = data;
    });
  }

  ionViewDidLoad() {
    this.getDataSalon();
  }

  getDataSalon() {
    this._loaderCtrl.showLoader().then(res => {
      this._restapiServiceProvider.getSalon(this.salon_id)
        .subscribe(data => {
          this._loaderCtrl.hideLoader();
          this.contact = data;
          this.loadMap(data.lat, data.lng);
        }, (error) => {
          this._loaderCtrl.hideLoader();
          this._alertCtrl.failedError(error);
        });
    })
  }

  loadMap(lat, lng) {
    const latLng = new google.maps.LatLng(lat, lng);

    const mapOptions = {
      draggable: false,
      center: latLng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    new google.maps.Marker({
      position: latLng,
      map: this.map
    });

  }

  list(ev) {
    this.scrollStatus = 'no-scroll';
    const listModal = this._modalCtrl.create('ListPage')
    listModal.present();
  }

  openWebpage(website){
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'yes'
    }

    this.inAppBrowser.create(website, '_self', options);
  }

}
