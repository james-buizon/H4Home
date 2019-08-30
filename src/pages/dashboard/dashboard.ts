import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController:LoadingController) {
  }

  items = [];
  locations = [];
  toTime = [];
  fromTime = [];

  generic_name = [];
  brand_name = [];
  qty = [];

  dosage = [];
  time = [];

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    let dashboardLoadingController = this.loadingController.create({
      content: "Loading dashboard info"
    });
    dashboardLoadingController.present();
    var events = []
    var time:string;
    console.log('ionViewWillEnter DashboardPage');
    this.getEvents().then((data) => {
      this.items = data[0];
      this.locations = data[4];
      this.toTime = data[3];
      this.fromTime = data[2];
      
      console.log(this.items);
      console.log(this.locations);
      console.log(this.fromTime);
      console.log(this.toTime);
      //console.log(this.schedules);
    });

    this.getPillReminder().then((data) => {
      this.brand_name = data[0];
      this.generic_name = data[1];    
      this.dosage = data[3];
      this.time = data[2];
      this.qty = data[4];
    
    });
    dashboardLoadingController.dismiss();
  }

  goToHome(){
    this.navCtrl.setRoot('HomePage');
  }

  async getEvents(){
    var titles = [], date = [], keys = [], from = [], to = [], location = []
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
          location.push(res[key].location)
          keys.push(key)
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    var data = [titles, date, from, to, location, keys]
    return data
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
}