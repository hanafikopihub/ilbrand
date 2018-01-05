
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTreatmentPage } from './list-treatment';

@NgModule({
    declarations: [
        ListTreatmentPage,
    ],
    imports: [
        IonicPageModule.forChild(ListTreatmentPage)
    ],
    exports: [
        ListTreatmentPage
    ]
})
export class ListTreatmentModule { }
