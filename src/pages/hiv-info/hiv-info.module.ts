import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HivInfoPage } from './hiv-info';

@NgModule({
  declarations: [
    HivInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(HivInfoPage),
  ],
})
export class HivInfoPageModule {}
