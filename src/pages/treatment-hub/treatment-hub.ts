import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the TreatmentHubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-treatment-hub',
  templateUrl: 'treatment-hub.html',
})
export class TreatmentHubPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TreatmentHubPage');

    let treatmentHubLoadingController = this.loadingController.create({
      content: "Loading treatment hub info"
    });
    treatmentHubLoadingController.present();
    this.getTreatmentHub().then((data) => {
      this.items = data[0];
      this.address = data[1];
      this.contact_no = data[2]
      this.keys = data[3];
    });
    treatmentHubLoadingController.dismiss();
  }

  items = [];
  address = [];
  contact_no = [];
  keys = [];

  async getTreatmentHub(){
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
          if(res[key].type == "Treatment Hub") {
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
