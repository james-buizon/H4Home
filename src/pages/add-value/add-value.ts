import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddValuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-value',
  templateUrl: 'add-value.html',
})
export class AddValuePage {

  from = '';
  cd4 = [];
  year = (new Date()).getFullYear();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.from = navParams.get('from');
    this.year = navParams.get('year')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddValuePage');
    if(this.from == 'cd4') {
      this.getCD4().then((data) => {
        this.cd4 = data
      });
    } else {
      this.getVL().then((data) => {
        this.cd4 = data
      });
    }
  }

  save() {
    console.log(this.cd4);
    if(this.from == 'cd4') {
      this.updateCD4();
    } else {
      this.updateVL();
    }
    this.navCtrl.popToRoot();
  }

  async getCD4() {
    var data = []
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/getCD4', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year: this.year
        }),
      })

      let res = await response.json();
      if(response.status>=200&& response.status < 300) {
        Object.keys(res).forEach(function(key) {
          console.log(res[key])
          data.push(res[key])
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    return data
  }

  async getVL() {
    var data = []
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/getVL', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year: this.year
        }),
      })

      let res = await response.json();
      if(response.status>=200&& response.status < 300) {
        Object.keys(res).forEach(function(key) {
          console.log(res[key])
          data.push(res[key])
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    return data
  }

  async updateCD4() {
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/updateCD4', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year: this.year,
          jan: this.cd4[4],
          feb: this.cd4[3],
          mar: this.cd4[7],
          apr: this.cd4[0],
          may: this.cd4[8],
          jun: this.cd4[6],
          jul: this.cd4[5],
          aug: this.cd4[1],
          sep: this.cd4[11],
          oct: this.cd4[10],
          nov: this.cd4[9],
          dec: this.cd4[2]
        })
      })

      let res = await response.text();
      if(response.status>=200&& response.status < 300) {
        if(res == 'Saved to db') {
          console.log("Saved");
        }
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
  }

  async updateVL() {
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/updateVL', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year: this.year,
          jan: this.cd4[4],
          feb: this.cd4[3],
          mar: this.cd4[7],
          apr: this.cd4[0],
          may: this.cd4[8],
          jun: this.cd4[6],
          jul: this.cd4[5],
          aug: this.cd4[1],
          sep: this.cd4[11],
          oct: this.cd4[10],
          nov: this.cd4[9],
          dec: this.cd4[2]
        })
      })

      let res = await response.text();
      if(response.status>=200&& response.status < 300) {
        if(res == 'Saved to db') {
          console.log("Saved");
        }
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
  }

}
