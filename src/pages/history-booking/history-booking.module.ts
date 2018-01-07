
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryBookingPage } from './history-booking';

import { PayPal } from '@ionic-native/paypal';

@NgModule({
    declarations: [
        HistoryBookingPage,
    ],
    imports: [
        IonicPageModule.forChild(HistoryBookingPage),
    ],
    exports: [
        HistoryBookingPage
    ],
    providers: [
        PayPal
    ]
})
export class HistoryBookingModule { }
