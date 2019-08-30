import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the RefillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-refill',
  templateUrl: 'refill.html',
})
export class RefillPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  generic_name = []
  brand_name = []
  dosage = []
  time = []
  qty = []
  keys = []
  status:string[] = new Array();

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefillPage');
  }

  ionViewWillEnter() {
    this.getPillReminder().then((data) => {
      this.brand_name = data[0];
      this.generic_name = data[1];
      this.dosage = data[3];
      this.time = data[2];
      this.qty = data[4];
      this.keys = data[5]
    });

    this.qty.forEach(function(value){
      console.log(value)
      if(value > 10){
        console.log('Qty is good')
       
      }
      else if(value <= 5){
        console.log('Qty is critical')
       
      }
      else if(value >= 6 && value <= 10){
        console.log('Qty is warning')
        
      }
    });
  }

  async getPillReminder(){
    var brand_name = [], generic_name = [], time = [], dosage = [], qty = [], keys = []
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/getPillReminder', {
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
          brand_name.push(res[key].brand_name)
          generic_name.push(res[key].generic_name)
          time.push(res[key].time)
          dosage.push(res[key].dosage + ' ' +res[key].dosage_form)
          qty.push(res[key].quantity)
          keys.push(key)
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    var data = [brand_name, generic_name, time, dosage, qty, keys]
    return data
  }

  presentPrompt(i) {
    let alert = this.alertCtrl.create({
      title: this.generic_name[i],
      inputs: [
        {
          name: 'Quantity',
          placeholder: "Remaining: " + this.qty[i],
          type: 'Number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.updateQuantity(data, this.generic_name[i], this.brand_name[i], this.dosage[i], this.time[i], this.keys[i])
          }
        }
      ]
    });
    alert.present();
  }

  async updateQuantity(data, g, b, d, t, k) {
    var df = d.split(' ');
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/updatePillReminder', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
     }, body: JSON.stringify({
            generic_name: g,
            brand_name: b,
            dosage: df[0],
            dosage_form: df[1],
            quantity: data.Quantity,
            time: t,
            id: k,
          })
      })

      let res = await response.text();
      if(response.status>=200&& response.status < 300) {
           this.getPillReminder().then((data) => {
             this.brand_name = data[0];
             this.generic_name = data[1];
             this.dosage = data[3];
             this.time = data[2];
             this.qty = data[4];
             this.keys = data[5]
           });
      }
    } catch(e) {

    }
  }

}
