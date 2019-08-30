import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';


@IonicPage()
@Component({
  selector: 'page-add-medicine',
  templateUrl: 'add-medicine.html',
})
export class AddMedicinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private localNotif:LocalNotifications,
    private platform: Platform) {

  }

  medicine = ''; brandName = ''; dosage = ''; dosageForm = ''; qty = ''; time = ''; names = [];

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMedicinePage');
    this.getGenericName().then((data) => {
      this.names = data[1]
    })
  }

  goBack(){
    this.navCtrl.popToRoot();
  }

  S4() {
    return (((1+Math.random())*0x1000000)|0)
  }

  saveInfo() {
    this.addPillReminder().then((key) => {
         this.platform.ready().then(() => {
           var today = new Date()
           var alarm = new Date(today.toLocaleDateString() + " " + this.time)
           if(alarm < today) {
                alarm.setDate(alarm.getDate() + 1)
           }
           this.localNotif.schedule({
            id: this.S4(),
            title: "REMINDER",
            text: "Time to take " + this.medicine,
            trigger: {at: alarm},
            data: { id: key },
            sound: "file://assets/alarm.mp3"
           });
         });
         this.goBack();
    });

  }

  async addPillReminder() {
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/setPillReminder', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          generic_name: this.medicine,
          brand_name: this.brandName,
          dosage: this.dosage,
          dosage_form : this.dosageForm,
          quantity : this.qty,
          time : this.time,
          //status: "Scheduled on " + this.time
        })
      })

      let res = await response.text();
      if(response.status>=200&& response.status < 300) {
        return res
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
  }

  async getGenericName() {
    var brand_name = [], generic_name = [], keys = []
    try {
      var response = await fetch('https://h4home-924ba.firebaseapp.com/getAllDrugInfoEn', {
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
          keys.push(key)
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    var data = [brand_name, generic_name, keys]
    return data
  }
}
