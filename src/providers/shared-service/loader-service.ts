import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoaderService {

    loading: any;

    constructor(public _loadingCtrl: LoadingController) { }

    showLoader() {
        this.loading = this._loadingCtrl.create({
            content: 'loading...',
            dismissOnPageChange: false
        });
        return this.loading.present();
    }

    hideLoader() {
        this.loading.dismissAll();
    }
}
