import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SpecificOtherInfoPage } from '../specific-other-info/specific-other-info';

/**
 * Generated class for the OtherInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-other-info',
  templateUrl: 'other-info.html',
})
export class OtherInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController:LoadingController) {
  }

  language = '';

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherInfoPage');
  }

  ionViewWillEnter() {
    let otherInfoLoadingController = this.loadingController.create({
      content: "Loading other information"
    });
    otherInfoLoadingController.present();
    this.getLanguage().then((lang) => {
      this.language = lang;
      this.getOtherInfo(lang).then((data) => {
        this.items = data[0];
        this.keys = data[1];
        otherInfoLoadingController.dismiss();
      });
    })
  }

  items = [];
  keys = [];

  itemSelected(item: string) {
    this.navCtrl.push(SpecificOtherInfoPage, {
      key: this.keys[this.items.indexOf(item)],
      lang: this.language
    });
    console.log("Selected Item", this.keys[this.items.indexOf(item)]);
  }

  async getOtherInfo(lang: string){
    var response;
    var titles = [], keys = [];
    try {
      if(lang == 'English') {
        response = await fetch('https://h4home-924ba.firebaseapp.com/getAllHivInfoOtherInfoEn', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
      } else {
        response = await fetch('https://h4home-924ba.firebaseapp.com/getAllHivInfoOtherInfoPh', {
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
          titles.push(res[key].title)
          keys.push(key)
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    var data = [titles, keys]
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


}
