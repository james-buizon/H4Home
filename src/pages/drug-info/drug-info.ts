import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DrugInformationPage } from '../drug-information/drug-information';
import { GlossaryPage } from '../glossary/glossary';

@IonicPage()
@Component({
  selector: 'page-drug-info',
  templateUrl: 'drug-info.html',
})
export class DrugInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrugInfoPage');
  }

  drugInformationPage = DrugInformationPage;
  glossaryPage = GlossaryPage;

}
