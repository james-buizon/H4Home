import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the GuidelinesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guidelines',
  templateUrl: 'guidelines.html',
})
export class GuidelinesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController:LoadingController) {
  }

  items = [];
  content = [];
  keys = [];

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuidelinesPage');
    let guidelinesLoadingController = this.loadingController.create({
      content: "Loading guidelines"
    });
    guidelinesLoadingController.present();
    this.getAllHIVInfoGuidelines().then((data) => {
      this.items = data[0];
      this.content = data[1]
      this.keys = data[2];
    });
    guidelinesLoadingController.dismiss();
  }

  async getAllHIVInfoGuidelines(){
    var titles = [], keys = [], content = [];
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/getAllHivInfoGuidelines', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })

      let res = await response.json();
      if(response.status>=200&& response.status < 300) {
        Object.keys(res).forEach((key) => {
          console.log(key)
          console.log(res[key])
          titles.push(res[key].title)
          content.push(res[key].content)
          keys.push(key)
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

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

}
