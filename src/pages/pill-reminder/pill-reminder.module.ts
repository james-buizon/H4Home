import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PillReminderPage } from './pill-reminder';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    PillReminderPage,
  ],
  imports: [
    NgCalendarModule,
    IonicPageModule.forChild(PillReminderPage),
  ],
})
export class PillReminderPageModule {}
