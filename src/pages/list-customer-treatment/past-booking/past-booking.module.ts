import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PastBookingPage } from './past-booking';

import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
    declarations: [
        PastBookingPage,
    ],
    imports: [
        Ionic2RatingModule,
        IonicPageModule.forChild(PastBookingPage),
    ],
    exports: [
        PastBookingPage
    ]
})
export class PastBookingModule { }
