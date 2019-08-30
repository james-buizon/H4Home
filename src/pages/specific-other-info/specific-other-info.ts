import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SpecificOtherInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-specific-other-info',
  templateUrl: 'specific-other-info.html',
})
export class SpecificOtherInfoPage {

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
    console.log('ionViewDidLoad SpecificOtherInfoPage');
    this.getOtherInfo(this.key).then((data) => {
      console.log(data);
      this.title = data[3]
      this.content = data[0]
    });
  }

  async getOtherInfo(key){
    var drug = []
    var response;
    try {
      if(this.lang == 'English') {
        response = await fetch('https://h4home-924ba.firebaseapp.com/get_hiv_info_other_info_en', {
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
        response = await fetch('https://h4home-924ba.firebaseapp.com/get_hiv_info_other_info_ph', {
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
          console.log(res[key])
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
