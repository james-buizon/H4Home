import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreatmentHubPage } from './treatment-hub';

@NgModule({
  declarations: [
    TreatmentHubPage,
  ],
  imports: [
    IonicPageModule.forChild(TreatmentHubPage),
  ],
})
export class TreatmentHubPageModule {}
