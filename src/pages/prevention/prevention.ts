import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SpecificPreventionPage } from '../specific-prevention/specific-prevention';

@IonicPage()
@Component({
  selector: 'page-prevention',
  templateUrl: 'prevention.html',
})
export class PreventionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreventionPage');
  }

  ionViewWillEnter() {
    let preventionLoadingController = this.loadingController.create({
      content: "Loading prevention information"
    });
    preventionLoadingController.present();
    this.getLanguage().then((lang) => {
      this.language = lang
      this.getHIVPrevention(lang).then((data) => {
        this.items = data[0];
        this.keys = data[1];
        preventionLoadingController.dismiss();
      });
    })
  }

  items = [];
  keys = [];
  language = '';

  itemSelected(item: string) {
    this.navCtrl.push(SpecificPreventionPage, {
      key: this.keys[this.items.indexOf(item)],
      lang: this.language
    });
    console.log("Selected Item", item);
  }

  async getHIVPrevention(lang: string){
    var titles = [], keys = []
    var response;
    try {
      if(lang == 'English') {
        response = await fetch('https://h4home-924ba.firebaseapp.com/getAllHivInfoPreventionEn', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
      } else {
        response = await fetch('https://h4home-924ba.firebaseapp.com/getAllHivInfoPreventionPh', {
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
