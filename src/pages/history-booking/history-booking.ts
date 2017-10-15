import { Component } from '@angular/core';
import { MyBookingPage } from '../my-booking/my-booking';
import { ModalController, NavParams, NavController, LoadingController } from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-history-booking',
  templateUrl: 'history-booking.html'
})
export class HistoryBookingPage {
  treatmentParam:any;
  operatorParam:any;
  dataBooking:any;
  dataOther:any;
  payOption: Array<any>;
  
  loading: any;
  MyBookingPage = MyBookingPage;
  constructor(
    public navParams: NavParams,
    public _modalCtrl: ModalController,
    public _navController: NavController,
    public _loadingCtrl: LoadingController,
    public _restapiServiceProvider: RestapiServiceProvider) {
    
    this.treatmentParam = this.navParams.get('treatment');
    this.operatorParam = this.navParams.get('operators');
    this.dataBooking = this.navParams.get('dataBooking');
    this.dataOther = this.navParams.get('dataOther');

    
    // this.payOption = [
    //   { "id":1, "option": "Paga in salone"},
    //   { "id":2, "option": "Paga con carta di credito"}]
  }

    list(ev) {
    let listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }

  showLoader(){
    this.loading = this._loadingCtrl.create({
       content: 'Authenticating...'
    });
    this.loading.present();
  }

  onSubmit() {
    this.showLoader();
      this._restapiServiceProvider.postBooking(this.dataBooking).subscribe(response => {
      this._navController.push(MyBookingPage, {dataBooking: this.dataBooking, treatment:this.treatmentParam, operators: this.operatorParam, dataOther:this.dataOther})
      this.loading.dismiss();
      }, (error) => {
        alert('failed submit')
        this.loading.dismiss();
      })
  }
}
