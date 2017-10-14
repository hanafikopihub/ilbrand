import { Component } from '@angular/core';
import { MyBookingPage } from '../my-booking/my-booking';
import { ModalController } from 'ionic-angular';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-history-booking',
  templateUrl: 'history-booking.html'
})
export class HistoryBookingPage {
  carts: Array<any>;
  payOption: Array<any>;
  MyBookingPage = MyBookingPage;
  constructor(
    public _modalCtrl: ModalController) {

    this.carts = [
      { "product": "Mani Rimozione + Aplicazone Flash", "durata": "60 min", "prezzo": "15,00" },
      { "product": "REFIL GEL", "durata": "30 min", "prezzo": "50,00" }]
    
    this.payOption = [
      { "id":1, "option": "Paga in salone"},
      { "id":2, "option": "Paga con carta di credito"}]
  }

    list(ev) {
    let listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }

}
