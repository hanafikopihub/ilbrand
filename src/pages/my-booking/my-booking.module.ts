
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBookingPage } from './my-booking';

import { Calendar } from '@ionic-native/calendar';

@NgModule({
    declarations: [
        MyBookingPage,
    ],
    imports: [
        IonicPageModule.forChild(MyBookingPage),
    ],
    exports: [
        MyBookingPage
    ],
    providers: [
        Calendar
    ]
})
export class MyBookingModule { }
