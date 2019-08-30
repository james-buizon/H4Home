import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddValuePage } from './add-value';

@NgModule({
  declarations: [
    AddValuePage,
  ],
  imports: [
    IonicPageModule.forChild(AddValuePage),
  ],
})
export class AddValuePageModule {}
