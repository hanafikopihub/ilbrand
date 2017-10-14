import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBookingPage } from './my-booking';

@NgModule({
  declarations: [
    MyBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBookingPage),
  ],
})
export class MyBookingPageModule {}
