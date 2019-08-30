import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GuidelinesPage } from '../guidelines/guidelines';
import { NewsAndUpdatesPage } from '../news-and-updates/news-and-updates';
import { OtherInfoPage } from '../other-info/other-info';
import { PreventionPage } from '../prevention/prevention';


@IonicPage()
@Component({
  selector: 'page-hiv-info',
  templateUrl: 'hiv-info.html',
})
export class HivInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HivInfoPage');
  }

  guidelinesPage = GuidelinesPage;
  newsAndUpdatesPage = NewsAndUpdatesPage;
  otherInfoPage = OtherInfoPage;
  preventionPage = PreventionPage;

}
