import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { NativeStorage } from '@ionic-native/native-storage';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-list-treatment',
  templateUrl: 'list-treatment.html'
})
export class ListTreatmentPage {

  treatments: Array<any>
  addTreatments: Array<any> = [];
  constructor(
    public _navCtrl: NavController,
    public _modalCtrl: ModalController,
    public _restapiServiceProvider: RestapiServiceProvider) {
    this.loadData();
  }

  list(ev) {
    let listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }

  loadData() {
    this._restapiServiceProvider.getSalon(604)
    .then(data => {
      this.treatments = data.treatments;
    });
  }

  addTreatment(treatment) {
    this.addTreatments = this.addTreatments.concat(treatment)
  }

  addToCart() {
    const treatmentls = JSON.parse(localStorage.getItem("treatments"));
    debugger;
    if(treatmentls != null){

    this.addTreatments = this.addTreatments.concat(treatmentls);
    }
    localStorage.setItem("treatments", JSON.stringify(this.addTreatments))
    debugger
    this.addTreatments = [];
    //this._navCtrl.setRoot
    this._navCtrl.push(CartPage);
  }
}

