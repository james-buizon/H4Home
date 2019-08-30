import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestingSitePage } from './testing-site';

@NgModule({
  declarations: [
    TestingSitePage,
  ],
  imports: [
    IonicPageModule.forChild(TestingSitePage),
  ],
})
export class TestingSitePageModule {}
