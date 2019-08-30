import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { Global } from "../../models/global";
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    splash = true;
    user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
  }

  async login(user:User) {
    var global_var = new Global();
    
    if(!this.user.email.includes('h4h'))
    {
      console.log(this.user.email)
    }
    else{
      this.user.email+='@gmail.com'
    }
    try {
      let response = await fetch(global_var.link + '/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.user.email,
          pass: this.user.password

        }),
      })

      let res = await response.text();
      if(response.status>=200&& response.status < 300) {
        console.log(res);
        if(res != "Not Logged in"){
          console.log("Successfully logged in!");
          this.navCtrl.setRoot('DashboardPage');
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

  register(){
   this.navCtrl.push('RegisterPage');
  }

}
