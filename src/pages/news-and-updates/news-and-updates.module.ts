import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsAndUpdatesPage } from './news-and-updates';

@NgModule({
  declarations: [
    NewsAndUpdatesPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsAndUpdatesPage),
  ],
})
export class NewsAndUpdatesPageModule {}
