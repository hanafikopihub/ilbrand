import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertService {
  constructor(public _alertCtrl: AlertController) { }

  errorConnectionAlert() {
    const alert = this._alertCtrl.create({
      title: 'Informazioni',
      subTitle: 'la connessione non è riuscita',
      buttons: ['Ok']
    });
    alert.present();
  }

  mustLoginAlert() {
    const alert = this._alertCtrl.create({
      title: 'Scusa',
      subTitle: 'Devi effettuare il login per effettuare una prenotazione',
      buttons: ['OK']
    });
    alert.present();
  }

  failedSubmit() {
    const alert = this._alertCtrl.create({
      title: 'Informazioni',
      subTitle: 'non è riuscito ad ordinare',
      buttons: ['OK']
    });
    alert.present();
  }

  failedError(data) {
    const alert = this._alertCtrl.create({
      title: 'Informazioni',
      subTitle: data,
      buttons: ['OK']
    });
    alert.present();
  }
}



