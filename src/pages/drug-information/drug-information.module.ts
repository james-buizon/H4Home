import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugInformationPage } from './drug-information';

@NgModule({
  declarations: [
    DrugInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(DrugInformationPage),
  ],
})
export class DrugInformationPageModule {}
