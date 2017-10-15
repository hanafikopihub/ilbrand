import { Component } from '@angular/core';
import { ModalController,NavController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { NativeStorage } from '@ionic-native/native-storage';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { BookingPage } from '../booking/booking';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  
  treatments : Array<any>;
  BookingPage = BookingPage;
  
  constructor(
    public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    public _modalCtrl: ModalController,
    public _restapiServiceProvider: RestapiServiceProvider) {

    this.treatments = JSON.parse(localStorage.getItem("treatments"));
   }
  
    list(ev) {
    let listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }

  remove(treatment) {
    this.treatments = this.treatments.filter(function( obj ) {
      return obj.s_treatment_id !== treatment.s_treatment_id;
    });

    localStorage.removeItem("treatments")
    localStorage.setItem("treatments", JSON.stringify(this.treatments))


  }

}
