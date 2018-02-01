import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class ReviewsPage {
  salonReview: any;
  avg_rating: any;
  salon_header_name: any;
  constructor(
    public _navCtrl: NavController,
    public _navParams: NavParams,
    public _viewCtrl: ViewController) {

    this.salonReview = this._navParams.get('data');
    this.salon_header_name = this._navParams.get('salon_name');
    this.avg_rating = this.salonReview.rating;
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this._viewCtrl.dismiss();
  }

}
