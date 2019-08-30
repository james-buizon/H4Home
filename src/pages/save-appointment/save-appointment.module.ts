import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaveAppointmentPage } from './save-appointment';

@NgModule({
  declarations: [
    SaveAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(SaveAppointmentPage),
  ],
})
export class SaveAppointmentPageModule {}
