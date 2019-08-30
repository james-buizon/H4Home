import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViralLoadPage } from './viral-load';

@NgModule({
  declarations: [
    ViralLoadPage,
  ],
  imports: [
    IonicPageModule.forChild(ViralLoadPage),
  ],
})
export class ViralLoadPageModule {}
