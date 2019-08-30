import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the TestingSitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testing-site',
  templateUrl: 'testing-site.html',
})
export class TestingSitePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    let testingSiteLoadingController = this.loadingController.create({
      content: "Loading testing site info"
    });
    testingSiteLoadingController.present();
    console.log('ionViewDidLoad TestingSitePage');
    this.getTestingSite().then((data) => {
      this.items = data[0];
      this.address = data[1];
      this.contact_no = data[2]
      this.keys = data[3];
    });
    testingSiteLoadingController.dismiss();
  }

  items = [];
  address = [];
  contact_no = [];
  keys = [];

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  async getTestingSite(){
    var names = [], keys = [], address = [], contact_no = []
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/getAllPharmacyFinder', {
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
          if(res[key].type == "Testing Site") {
            names.push(res[key].name)
            address.push(res[key].address)
            contact_no.push(res[key].contact_no)
            keys.push(key)
          }
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    var data = [names, address, contact_no, keys]
    return data
  }

}
