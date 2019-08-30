import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications} from '@ionic-native/local-notifications';
import { App } from 'ionic-angular'

import { LoginPage } from '../pages/login/login';
var gen_Name
var brand_Name
@Component({
    templateUrl: 'app.html'

})
export class MyApp {
    rootPage:any = LoginPage;

    //qty = 0;
    S4() {
        return (((1+Math.random())*0x1000000)|0)
    }

    constructor(public app:App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
                private alertCtrl:AlertController, private localNotif:LocalNotifications) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

            this.localNotif.on('click').subscribe(notification =>{
                this.app.getActiveNav().setRoot('HomePage');
                this.presentConfirm(notification);
            });
        });
    }


    presentConfirm(notification: any){
        let alert = this.alertCtrl.create({
            title: 'Medicine Intake',
            message: 'Did you take your medicine?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        console.log('Clicked no');
                        this.localNotif.schedule({
                            id: this.S4(),
                            title: "REMINDER",
                            text: "Time to take your medicine!",
                            trigger: {at: new Date(new Date().getTime() + 600000)},
                            data: { id: notification.data.id },
                            sound: "file://assets/alarm.mp3"
                        });
                        this.setPerformance2();
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        console.log('Clicked yes');
                        this.getPillReminder().then((data) => {
                            console.log("Data: " + JSON.stringify(data))
                            console.log("Notification: " + notification.data.id)
                            let pill = data[notification.data.id]
                            console.log("Pill: " + JSON.stringify(pill))
                            gen_Name = pill.generic_name
                            brand_Name = pill.brand_name
                            pill.quantity = pill.quantity - 1
                            pill.id = notification.data.id
                            pill.status = "TAKEN"
                            this.updatePillReminder(pill).then(() => {
                                this.setPerformance().then(() => {
                                    this.localNotif.schedule({
                                        id: this.S4(),
                                        title: "REMINDER",
                                        text: "Time to take your medicine!",
                                        trigger: {at: new Date(new Date().getTime() + 86400000)},
                                        data: { id: notification.data.id },
                                        sound: "file://assets/alarm.mp3"
                                    });
                                })


                            })
                        })
                    }
                }
            ]
        });
        alert.present();
    }

    async updatePillReminder(data){
        try {
            let response = await fetch('https://h4home-924ba.firebaseapp.com/updatePillReminder', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            let res = await response.text();
            if(response.status>=200&& response.status < 300) {
                if(res == 'Added') {
                    console.log("Saved");
                }
            } else {
                // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
            }
        } catch(e) {
            console.log(e)
        }
    }

    async getPillReminder(){
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
                return res
            } else {
                // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
            }
        } catch(e) {
            console.log(e)
        }
    }

    async setPerformance(){

        try {
            let response = await fetch('https://h4home-924ba.firebaseapp.com/setPerformance', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    generic_name: gen_Name,
                    brand_name:brand_Name,
                    status: "TAKEN",
                    time: new Date(new Date().getTime())
                })
            })

            let res = await response.text();
            if(response.status>=200&& response.status < 300) {
                return res
            } else {
                // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
            }
        }catch(e){
            console.log(e)
        }
    }

    async setPerformance2(){

        try {
            let response = await fetch('https://h4home-924ba.firebaseapp.com/setPerformance', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    generic_name:gen_Name,
                    brand_name:brand_Name,
                    status: "MISSED",
                    time: new Date(new Date().getTime())
                })
            })

            let res = await response.text();
            if(response.status>=200&& response.status < 300) {
                return res
            } else {
                // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
            }
        }catch(e){
            console.log(e)
        }
    }
}
