import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-save-appointment',
  templateUrl: 'save-appointment.html',
})
export class SaveAppointmentPage {

  title = ''; location = ''; from = ''; to = ''; date = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private localNotif:LocalNotifications, private platform: Platform) {
    this.date = navParams.get("date")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaveAppointmentPage');
  }

  goBack(){
    this.navCtrl.popToRoot();
  }

  S4() {
    return (((1+Math.random())*0x1000000)|0)
  }

  saveInfo(){
    this.addAppointment().then(() => {
         this.platform.ready().then(() => {
           var sched = new Date(this.date)
           var time = this.from.split(':')
           sched.setHours(parseInt(time[0]))
           if(parseInt(time[1]) != 0) {
                sched.setMinutes(parseInt(time[1]))
           }
           console.log(this.date)
           this.localNotif.schedule({
             id: this.S4(),
             title: "REMINDER",
             text: this.title + " " + this.location + " " + this.from + "-" + this.to,
             trigger: {at: sched}
           });
         });
    })
    // this.navCtrl.push('SaveAppointmentPage');
  }

  async addAppointment() {
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/addAppointment', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.title,
          location: this.location,
          from: this.from,
          to: this.to,
          date: this.date
        })
      })

      let res = await response.text();
      if(response.status>=200&& response.status < 300) {
        if(res == 'Added to DB') {
          console.log("Saved");
          this.navCtrl.popToRoot();
        }
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
  }

}
