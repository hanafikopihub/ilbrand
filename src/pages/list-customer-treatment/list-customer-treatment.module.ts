import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCustomerTreatment } from './list-customer-treatment';

@NgModule({
    declarations: [
        ListCustomerTreatment,
    ],
    imports: [
        IonicPageModule.forChild(ListCustomerTreatment),
    ],
    exports: [
        ListCustomerTreatment
    ]
})
export class ListCustomerTreatmentModule { }
