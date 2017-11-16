import { Injectable } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

@Injectable()
export class AlertService {
  constructor(
    public _alertCtrl: AlertController,
    public _modalCtrl: ModalController) { }

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
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            const loginModal = this._modalCtrl.create(LoginPage)
            loginModal.present();
          }
        }
      ]
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



