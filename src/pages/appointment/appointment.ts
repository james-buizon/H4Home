import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core'
import { CalendarComponent } from 'ionic2-calendar/calendar';


@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {

  @ViewChild('myCalendar') myCalendar:CalendarComponent

  eventSource = [];
  viewTitle:string;
  selectedDay = new Date();

  calendar = {
    mode:'month',
    currentDate:this.selectedDay
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PillReminderPage');
  }

  ionViewWillEnter() {
    var events = []
    console.log('ionViewWillEnter PillReminderPage');
    this.getEvents().then((data) => {
      for(var x = 0; x < data[0].length; x++) {
        events.push({
          title: data[0][x],
          startTime: new Date(data[1][x].split('T')[0] + ' ' + data[2][x] + ':00'),
          endTime: new Date(data[1][x].split('T')[0] + ' ' + data[3][x] + ':00'),
          allDay: false
        })
      }
      this.eventSource = events
      this.myCalendar.loadEvents()
      console.log("ha" +this.eventSource)
    });
  }

  addEvent(){

  }

  loadEvents() {

  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onTimeSelected(ev){
    ev.selectedDay = ev.selectedTime;
  }

  onEventSelected(event){

  }

  onCurrentDateChanged(event:Date) {
    this.selectedDay = event
    // this.calendar.loadEvents();
    console.log(event)
    this.myCalendar.loadEvents()
  }

  saveInfo(){
    this.navCtrl.push('SaveAppointmentPage', {
      date: this.selectedDay
    });
   }

   async getEvents(){
     var titles = [], date = [], keys = [], from = [], to = []
     try {
       let response = await fetch('https://h4home-924ba.firebaseapp.com/getAppointment', {
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
           titles.push(res[key].name)
           date.push(res[key].date)
           from.push(res[key].from)
           to.push(res[key].to)
           keys.push(key)
         })
       } else {
            // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
       }
     } catch(e) {
       console.log(e)
     }
     var data = [titles, date, from, to, keys]
     return data
   }
}
