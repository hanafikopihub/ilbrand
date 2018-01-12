import { Component } from '@angular/core';
import { Events, ViewController, NavController, ModalController } from 'ionic-angular';

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
  staffs: Array<any>;
  scrollStatus: string;

  constructor(
    public _loaderCtrl: LoaderService,
    public navCtrl: NavController,
    public _alertCtrl: AlertService,
    public _restapiServiceProvider: RestapiServiceProvider,
    public _modalCtrl: ModalController,
    public _events: Events,
    public _viewController: ViewController) {

    _events.subscribe('page:scroll', (data) => {
      this.scrollStatus = data;
    });

    this.scrollStatus = 'can-scroll';
    
    this.salon_id = JSON.parse(localStorage.getItem('salon_id'));
    this.staffs = [
      {
        'name': 'GIORDANO',
        'about': 'La passione è il punto di forza che caratterizza il lavoro di Giordano. <br> Un professionista sempre alla ricerca di nuove ispirazioni per suggerire look personalizzati.<br> Hair stylist e Formatore z-oneconcept education.',
        'image': 'https://staging.salonist.it/mobile_app/ilbrand/giordano.jpg',
      },
      {
        'name': 'LORENA',
        'about': 'Dicono che abbia mani di fata! Rimarrete inebriati dalla sua dolcezza e dai suoi massaggi durante ogni trattamento.<br> A questo si aggiunge la grande cura nei dettagli dedicata a ciascun servizio offerto.',
        'image': 'https://staging.salonist.it/mobile_app/ilbrand/lorena.jpg'
      },
      {
        'name': 'ANNA',
        'about': 'Se desiderate una consulenza di immagine per un nuovo look o per esaltare il vostro taglio attuale, Anna è la persona giusta! <br> La sua abilità sta nel saper esaudire i desideri delle donne.',
        'image': 'https://staging.salonist.it/mobile_app/ilbrand/anna.jpg'
      },
      {
        'name': 'SARA',
        'about': 'Sara è una new entry nel nostro staff e si definisce CREATIVA! <br> Sempre a vostra disposizione con il sorriso, saprà offrirvi una consulenza personalizzata e coccolarvi con servizi per la cura e la bellezza dei capelli. <br> È specializzata, inoltre, nella cura della barba ed è in grado di rendere ogni uomo impeccabile.',
        'image': 'https://staging.salonist.it/mobile_app/ilbrand/sara.jpg'
      }
    ]
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
    this.scrollStatus = 'no-scroll';
    const listModal = this._modalCtrl.create('ListPage')
    listModal.present();
  }

}
