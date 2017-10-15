import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController} from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-list-customer-treatment',
  templateUrl: 'list-customer-treatment.html'
})
export class ListCustomerTreatment {
  treatments: Array<any>;
  treatment_count: number;
  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public AuthServiceProvider: AuthServiceProvider, public RestapiServiceProvider: RestapiServiceProvider, public loading: LoadingController) {
  }

  ionViewDidLoad() {

    console.log(this.AuthServiceProvider.currentAuthData);
    let user_id = this.AuthServiceProvider.currentAuthData.uid;
    let loader = this.loading.create({
      content: 'loading...',
    });

    loader.present().then(() => {
      this.RestapiServiceProvider.getMyBooking(user_id)
        .subscribe(response => {
          this.treatments = response.bookings;
          this.treatment_count = response.total_booking;
          loader.dismiss();
        }, (error) => {
          loader.dismiss();
          this.presentToast(error);
      })
    });
  
    // this.treatments = [{"title":"Piedi Applicazione Semipermanen","salon_name":"Yndaco Seregno","reservation_date":"19/02/2017"}]
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
