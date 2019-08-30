import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecificDrugInfoPage } from './specific-drug-info';

@NgModule({
  declarations: [
    SpecificDrugInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecificDrugInfoPage),
  ],
})
export class SpecificDrugInfoPageModule {}
