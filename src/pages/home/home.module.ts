import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2RatingModule } from "../../components/ionic2-rating/ionic2-rating.module";
import { HomePage } from './home';

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        Ionic2RatingModule,
        IonicPageModule.forChild(HomePage)
    ],
    exports: [
        HomePage
    ]
})
export class HomeModule { }
