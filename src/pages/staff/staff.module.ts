
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffPage } from './staff';

@NgModule({
    declarations: [
        StaffPage,
    ],
    imports: [
        IonicPageModule.forChild(StaffPage)
    ],
    exports: [
        StaffPage
    ]
})
export class StaffModule { }
