import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // async register(user: User){
  //   try{
  //       const result = await  this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
  //       console.log(result);
  //   }
  //   catch(e){
  //       console.error(e);
  //   }
  //
  // }

  async register(user:User) {
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/create_user', {
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
        if(res == "Successfully created account"){
          console.log("Successfully logged in!");
          this.login(user);
        } else {
          // this.ShowError({title:"Invalid login", message:"Please check your email or password.", valid:false});
        }
      } else {
          //  this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }

  }

  async login(user:User) {
    console.log(this.user.email)
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/login', {
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
          this.setLanguage();
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

  async setLanguage() {
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/setLanguage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'English'
        }),
      });

      let res = await response.text();
      if(response.status>=200&& response.status < 300) {
        console.log(res);
        if(res == "Language Set") {
          this.navCtrl.setRoot('HomePage');
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
}
