import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SpecificDrugInfoPage } from '../specific-drug-info/specific-drug-info';

@IonicPage()
@Component({
  selector: 'page-drug-information',
  templateUrl: 'drug-information.html',
})
export class DrugInformationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController:LoadingController) {
  }

  items = []
  meds = []
  keys = []
  language = ''

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrugInformationPage');
  }

  ionViewWillEnter() {
    let drugInfoLoadingController = this.loadingController.create({
        content: "Loading drug information"
    });
    drugInfoLoadingController.present();
    this.getLanguage().then((lang) => {
      this.language = lang
      this.getDrugInfo(lang).then((data) => {
        this.items = data[0]
        this.meds = data[1]
        this.keys = data[2]
        console.log(this.keys)
        drugInfoLoadingController.dismiss();
      });
    })
  }

  async getDrugInfo(lang: string){
    var brand_name = [], generic_name = [], keys = []
    var response;
    try {
      if(lang == 'English') {
        response = await fetch('https://h4home-924ba.firebaseapp.com/getAllDrugInfoEn', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
      } else {
        response = await fetch('https://h4home-924ba.firebaseapp.com/getAllDrugInfoPh', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
      }

      let res = await response.json();
      if(response.status>=200&& response.status < 300) {
        Object.keys(res).forEach(function(key) {
          console.log(key)
          console.log(res[key])
          brand_name.push(res[key].brand_name)
          generic_name.push(res[key].generic_name)
          keys.push(key)
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    var data = [brand_name, generic_name, keys]
    return data
  }

  async getLanguage() {
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/getLanguage', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      let res = await response.json();
      if(response.status>=200&& response.status < 300) {
         return res['language']
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
  }

  itemSelected(item: string) {
    this.navCtrl.push(SpecificDrugInfoPage, {
      key: this.keys[this.items.indexOf(item)],
      lang: this.language
    });
    console.log("Selected Item", this.keys[this.items.indexOf(item)]);
  }

}
