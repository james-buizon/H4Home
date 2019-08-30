import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-glossary',
  templateUrl: 'glossary.html',
})
export class GlossaryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController:LoadingController) {
  }

  items = [];
  meds = [];
  keys = [];

  ionViewDidLoad() {
    console.log('ionViewDidLoad GlossaryPage');
  }

  ionViewWillEnter() {
    let glossaryLoadingController = this.loadingController.create({
      content: "Loading glossary information"
    });
    glossaryLoadingController.present();
    this.getLanguage().then((lang) => {
      this.getGlossary(lang).then((data) => {
        this.items = data[0]
        this.meds = data[1]
        this.keys = data[2]
        glossaryLoadingController.dismiss();
      });
    })
  }

  async getGlossary(lang: string){
    var titles = [], keys = [], content = [];
    var response;
    try {
      if(lang == 'English') {
        response = await fetch('https://h4home-924ba.firebaseapp.com/getAllHivInfoGlossaryEn', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
      } else {
        response = await fetch('https://h4home-924ba.firebaseapp.com/getAllHivInfoGlossaryPh', {
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
          content.push(res[key].content)
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    var data = [titles, content, keys]
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
