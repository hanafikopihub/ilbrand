import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';

// service
import { LoaderService } from '../../../providers/shared-service/loader-service';
import { ToastService } from '../../../providers/shared-service/toast-service';

@IonicPage()
@Component({
  selector: 'change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  resetData = { email: '' };

  constructor(
    public _navParams: NavParams,
    public _loader: LoaderService,
    public _navCtrl: NavController,
    public _viewCtrl: ViewController,
    public _modalCtrl: ModalController,
    public _toastService: ToastService,
    private _tokenService: Angular2TokenService) {
  }

  doRequestResetPassword() {
    if (this.resetData.email === '') {
      this._toastService.presentToast('Completa con tutti i dati, grazie!')
    } else {
      this._loader.showLoader().then(response => {
        this._tokenService.resetPassword(this.resetData).subscribe(
          res => {
            this._loader.hideLoader();
            this._navCtrl.push('HomePage', { 'status': true });
            this._toastService.successToast('Ti abbiamo spedito una mail per il reset della password');
          },
          error => {
            const error_messasge = JSON.parse(error._body);
            this._loader.hideLoader();
            this._toastService.presentToast(error_messasge.errors[0]);
          }
        );
      })
    }
  }
}
