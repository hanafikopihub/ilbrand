import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2RatingModule } from "../../components/ionic2-rating/ionic2-rating.module";
import { ReviewsPage } from './reviews';

@NgModule({
    declarations: [
        ReviewsPage,
    ],
    imports: [
        IonicPageModule.forChild(ReviewsPage),
        Ionic2RatingModule
    ],
    exports: [
        ReviewsPage
    ]
})
export class ReviewsModule { }