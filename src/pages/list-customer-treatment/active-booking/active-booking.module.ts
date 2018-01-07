import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveBookingPage } from './active-booking';

@NgModule({
    declarations: [
        ActiveBookingPage,
    ],
    imports: [
        IonicPageModule.forChild(ActiveBookingPage),
    ],
    exports: [
        ActiveBookingPage
    ]
})
export class ActiveBookingModule { }
