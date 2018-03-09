
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTreatmentPage } from './list-treatment';
import { OrderByPipe } from '../../pipes/order-by/order-by';

@NgModule({
    declarations: [
        ListTreatmentPage,
        OrderByPipe
    ],
    imports: [
        IonicPageModule.forChild(ListTreatmentPage)
    ],
    exports: [
        ListTreatmentPage
    ]
})
export class ListTreatmentModule { }
