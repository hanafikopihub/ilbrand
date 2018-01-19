import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertService {
  constructor(public _alertCtrl: AlertController) { }

  errorConnectionAlert(data) {
    if (data.status === 0) {
      data = 'Attenzione! Questa app necessita di una connessione internet per funzionare';
    }
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

  failedSubmit(data) {
    if (data.status === 0) {
      data = 'Attenzione! Questa app necessita di una connessione internet per funzionare';
    }
    const alert = this._alertCtrl.create({
      title: 'Informazioni',
      subTitle: 'non è riuscito ad ordinare',
      buttons: ['OK']
    });
    alert.present();
  }

  failedError(data) {
    if (data.status === 0) {
      data = 'Attenzione! Questa app necessita di una connessione internet per funzionare';
    }
    const alert = this._alertCtrl.create({
      title: 'Informazioni',
      subTitle: data,
      buttons: ['OK']
    });
    alert.present();
  }

  error(data) {
    if (data.status === 0) {
      data = 'Attenzione! Questa app necessita di una connessione internet per funzionare';
    }
    const alert = this._alertCtrl.create({
      title: 'Informazioni',
      subTitle: data,
      buttons: ['OK']
    });
    return alert.present();
  }
}



