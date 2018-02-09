import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PastBookingPage } from './past-booking';

import { Ionic2RatingModule } from "../../../components/ionic2-rating/ionic2-rating.module";

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
