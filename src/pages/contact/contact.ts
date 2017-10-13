import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { ListPage } from '../list/list';

declare var google;
 
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  ListPage = ListPage
  constructor(
  	public navCtrl: NavController,
  	public _viewController: ViewController,
  	public _modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(45.651063, 9.2000145);
 
    let mapOptions = {
      center: latLng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
 	new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: 'Hello World!'
      });
 
  }

  list(ev) {
    let listModal = this._modalCtrl.create(ListPage)
    listModal.present();
  }

}
