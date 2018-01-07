import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneSalonPage } from './phone-salon';

@NgModule({
    declarations: [
        PhoneSalonPage,
    ],
    imports: [
        IonicPageModule.forChild(PhoneSalonPage)
    ],
    exports: [
        PhoneSalonPage
    ]
})
export class PhoneSalonModule { }