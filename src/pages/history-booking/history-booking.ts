import { Component } from '@angular/core';
import { MyBookingPage } from '../my-booking/my-booking';
import { ModalController, NavParams, NavController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-history-booking',
  templateUrl: 'history-booking.html'
})
export class HistoryBookingPage {
  carts: Array<any>;
  treatmentParam:any;
  operatorParam:any;
  dataBooking:any;
  dataOther:any;
  payOption: Array<any>;
  MyBookingPage = MyBookingPage;
  constructor(
    public navParams: NavParams,
    public _modalCtrl: ModalController,
    public _navController: NavController,
    public _restapiServiceProvider: RestapiServiceProvider) {
    
    this.treatmentParam = this.navParams.get('treatment');
    this.operatorParam = this.navParams.get('operators');
    this.dataBooking = this.navParams.get('dataBooking');
    this.dataOther = this.navParams.get('dataOther');

    
    debugger;
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

  onSubmit() {
      this._restapiServiceProvider.postBooking(this.dataBooking).subscribe(response => {
      this._navController.push(MyBookingPage, {dataBooking: this.dataBooking, treatment:this.treatmentParam, operators: this.operatorParam, dataOther:this.dataOther})
      
      }, (error) => {
        alert('failed submit')
      })
  }
}
