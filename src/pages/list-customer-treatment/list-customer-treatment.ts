import { Component } from '@angular/core';
import { NavController, LoadingController} from 'ionic-angular';
import { RestapiServiceProvider } from '../../providers/restapi-service/restapi-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-list-customer-treatment',
  templateUrl: 'list-customer-treatment.html'
})
export class ListCustomerTreatment {
  treatments: Array<any>;
  treatment_count: number;
  constructor(public navCtrl: NavController, public AuthServiceProvider: AuthServiceProvider, public RestapiServiceProvider: RestapiServiceProvider, public loading: LoadingController) {
  }

  ionViewDidLoad() {

    console.log(this.AuthServiceProvider.currentUserData);
    let user_id = this.AuthServiceProvider.currentUserData.user_id;
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
      })
    });
  
    this.treatments = [{"title":"Piedi Applicazione Semipermanen","salon_name":"Yndaco Seregno","reservation_date":"19/02/2017"}]
  }

}
