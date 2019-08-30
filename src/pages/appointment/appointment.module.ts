import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentPage } from './appointment';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    AppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentPage),
    NgCalendarModule,
  ],
})
export class AppointmentPageModule {}
