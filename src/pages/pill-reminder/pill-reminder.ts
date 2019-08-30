import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pill-reminder',
  templateUrl: 'pill-reminder.html',
})
export class PillReminderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  generic_name = []
  brand_name = []
  dosage = []
  time = []
  qty = []
  status = []

  ionViewDidLoad() {
    console.log('ionViewDidLoad PillReminderPage');
  }

  ionViewWillEnter() {
    this.getPillReminder().then((data) => {
      this.brand_name = data[0];
      this.generic_name = data[1];
      this.dosage = data[3];
      this.time = data[2];
      this.qty = data[4];
      this.status = data[6]
    });
  }

  addMedicine(){
    this.navCtrl.push('AddMedicinePage');
  }

  async getPillReminder(){
    var brand_name = [], generic_name = [], time = [], dosage = [], qty = [], keys = [], status=[]
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
          status.push(res[key].status)
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    var data = [brand_name, generic_name, time, dosage, qty, keys,status]
    return data
  }


}
