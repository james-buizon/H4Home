import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SpecificDrugInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-specific-drug-info',
  templateUrl: 'specific-drug-info.html',
})
export class SpecificDrugInfoPage {

  key = ''
  title = ''
  content = ''
  lang = ''

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.key = navParams.get('key')
    this.lang = navParams.get('lang')
    console.log(this.key)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecificDrugInfoPage');
    this.getDrugInfo(this.key).then((data) => {
      console.log(data);
      this.title = data[0]
      this.content = data[1]
    });
  }

  async getDrugInfo(key){
    var drug = []
    var response;
    try {
      if(this.lang == 'English') {
        response = await fetch('https://h4home-924ba.firebaseapp.com/getDrugInfoEn', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: key
          }),
        })
      } else {
        response = await fetch('https://h4home-924ba.firebaseapp.com/getDrugInfoPh', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: key
          }),
        })
      }

      let res = await response.json();
      if(response.status>=200&& response.status < 300) {
        Object.keys(res).forEach(function(key) {
          drug.push(res[key])
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    return drug
  }

}
