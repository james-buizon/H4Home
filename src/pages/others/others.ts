import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the OthersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-others',
  templateUrl: 'others.html',
})
export class OthersPage {

  items = [
    'Reports',
    'Rewards',
    'Performance',
    'Language Options',
    'Change Password',
    'App Version'
  ];
  status = []

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertController:AlertController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OthersPage');

    
    this.getPerformance().then((data)=>{
      this.status = data[3]
    })
    
  }

  itemSelected(item: string) {
    if(item == "Reports"){
      this.navCtrl.push('ReportsPage');
    }
    else if(item == "Language Options") {
      this.changeLang();
    }

    else if(item == "Change Password"){
      this.navCtrl.push('ChangePwPage');
    }

    else if(item == "Rewards"){
      this.redeem();
    } else if(item == 'App Version') {
      this.appToast();
    }
    console.log("Selected Item", item);
  }

  redeem(){
    var points = 0
    for(let stat of this.status){
      console.log(stat)
      if(stat == 'TAKEN')
        points+=1
        
    }

    let redeemRewards = this.alertController.create({
      title: "Rewards",
      message: "Accumulated Points",
      buttons:[
        {
          text:"REDEEM " + points
        }
      ]

    });
    redeemRewards.present();
  }

  changeLang(){
    let redeemRewards = this.alertController.create({
      title: "Language",
      message: "Choose Preferred Language",
      buttons:[
        {
          text:"English",
          handler: () => {
            this.setLanguage('English')
          }
        },
        {
          text:"Tagalog",
          handler: () => {
            this.setLanguage('Tagalog')
          }
        }
      ]

    });
    redeemRewards.present();
  }

  async setLanguage(lang: string) {
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/setLanguage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: lang
        }),
      });

      let res = await response.text();
      if(response.status>=200&& response.status < 300) {
        console.log(res);
        if(res == "Language Set") {
          this.presentToast();
        } else {
          // this.ShowError({title:"Invalid login", message:"Please check your email or password.", valid:false});
        }
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Language Changed',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  appToast() {
    let toast = this.toastCtrl.create({
      message: 'H4HOME Version 1 Beta',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  async getPerformance(){
    var brand_name = [], generic_name = [], time = [], status = []
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/getPerformance', {
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
          status.push(res[key].status)
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    var data = [brand_name, generic_name, time, status]
    return data
  }

}
