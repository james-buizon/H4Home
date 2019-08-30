import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TreatmentHubPage } from '../treatment-hub/treatment-hub';
import { TestingSitePage } from '../testing-site/testing-site';

@IonicPage()
@Component({
  selector: 'page-pharmacy',
  templateUrl: 'pharmacy.html',
})
export class PharmacyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PharmacyPage');
  }

  treatmentHubPage = TreatmentHubPage;
  testingSitePage = TestingSitePage;

}
