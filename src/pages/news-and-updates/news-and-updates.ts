import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
// import {InAppBrowser} from 'ionic-native'

/**
 * Generated class for the NewsAndUpdatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-and-updates',
  templateUrl: 'news-and-updates.html',
})
export class NewsAndUpdatesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad News and Updates Page');

    let newsAndUpdatesLoadingController = this.loadingController.create({
      content: "Loading news and updates"
    });
    newsAndUpdatesLoadingController.present();
    this.getNewsUpdates().then((data) => {
      this.items = data[0];
      this.keys = data[1];
    });
    newsAndUpdatesLoadingController.dismiss();
  }

  items = [];
  keys = [];

  itemSelected(item: string) {
    console.log("Selected Item", item);
    window.open(this.keys[this.items.indexOf(item)], '_system','location=yes');
  }

  async getNewsUpdates(){
    var titles = [], urls = []
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/getAllHivInfoNewsUpdates', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })

      let res = await response.json();
      if(response.status>=200&& response.status < 300) {
        Object.keys(res).forEach(function(key) {
          console.log(key)
          console.log(res[key])
          titles.push(res[key].title)
          urls.push(res[key].url)
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    var data = [titles, urls]
    return data
  }

}
