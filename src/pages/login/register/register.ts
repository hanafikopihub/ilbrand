import { Component } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';

// extrenal library
import { CustomValidators } from 'ng2-validation';

// cores
import { AppApi } from '../../../app.api';

// services
import { Angular2TokenService } from 'angular2-token';
import { ToastService } from '../../../providers/shared-service/toast-service';
import { LoaderService } from '../../../providers/shared-service/loader-service';

@IonicPage()
@Component({
  selector: 'register-page',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerData: FormGroup;

  constructor(
    public _navParams: NavParams,
    public _loader: LoaderService,
    public _navCtrl: NavController,
    public _viewCtrl: ViewController,
    public _formBuilder: FormBuilder,
    public _modalCtrl: ModalController,
    public _toastService: ToastService,
    private _tokenService: Angular2TokenService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerData = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.email]],
      cell: '',
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
    });
  }

  doRegister() {
    if (!this.registerData.controls.password.valid && this.registerData.value.password !== '') {
      this._toastService.presentToast('La password deve essere di almeno 6 caratteri');
    } else {
      if (!this.registerData.valid) {
        this._toastService.presentToast('Completa con tutti i dati, grazie!');
      } else {
        this._loader.showLoader().then(result => {
          this._tokenService.request({
            method: RequestMethod.Post,
            url: AppApi.BASE_API_URL + '/api/v1/auth',
            body: { user: this.registerData.value }
          }).subscribe(
            res => {
              const loginData = { email: this.registerData.value.email, password: this.registerData.value.password };
              this._tokenService.request({
                method: RequestMethod.Post,
                url: AppApi.BASE_API_URL + '/api/v1/auth/sign_in',
                body: loginData
              }).subscribe(
                response => {
                  this._loader.hideLoader();
                  this._navCtrl.push('HomePage', { 'status': true });
                  // this._toastService.successToast('Welcome to salonist')
                },
                error => {
                  this._loader.hideLoader();

                  const error_message = JSON.parse(error._body);
                  this._toastService.presentToast(error_message.errors.full_messages[0]);
                }
                );
            },
            error => {
              this._loader.hideLoader();
              const error_message = JSON.parse(error._body);
              this._toastService.presentToast(error_message.errors.full_messages.join('. '));
            }
            );
        })
      }
    }
  }
}
