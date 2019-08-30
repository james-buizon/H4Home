import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddValuePage } from '../add-value/add-value';

@IonicPage()
@Component({
  selector: 'page-cd4-tracking',
  templateUrl: 'cd4-tracking.html',
})
export class Cd4TrackingPage {

  public lineChartData:Array<any> = [
    {data: [9, 18, 48, 65, 83, 100, 90, 77, 60, 53, 45, 33, 10], label: 'CD4 Count'}
  ];
  public lineChartLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
  }

  public clicked() {
    this.navCtrl.push(AddValuePage, {from: 'cd4', year: this.year});
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  year = (new Date()).getFullYear();
  years:Array<String> = [];

  ionViewDidLoad() {
    console.log('ionViewDidLoad Cd4TrackingPage');
    this.getYears().then((data) => {
      for(var x = 0; x < data.length; x++) {
        this.years.push(data[x])
      }
      if(!this.years.includes(this.year + "")) {
        this.addCD4()
      }
    })
  }

  ionViewWillEnter() {
    this.getCD4().then((cd4) => {
      this.lineChartData = [{data: [cd4[4], cd4[3], cd4[7], cd4[0], cd4[8], cd4[6], cd4[5], cd4[1], cd4[11], cd4[10], cd4[9], cd4[2]], label: 'CD4 Count'}]
    })
  }

  yearChange(val) {
    this.year = val
    this.getCD4().then((cd4) => {
      this.lineChartData = [{data: [cd4[4], cd4[3], cd4[7], cd4[0], cd4[8], cd4[6], cd4[5], cd4[1], cd4[11], cd4[10], cd4[9], cd4[2]], label: 'CD4 Count'}]
    })
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

  async getYears() {
    var years = []
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/getCD4Years', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })

      let res = await response.json();
      if(response.status>=200&& response.status < 300) {
        Object.keys(res).forEach(function(key) {
          console.log('Key' + key)
          years.push(key)
        })
      } else {
           // this.ShowError({title:"Oops", message:"The server is having some problems.", valid:false});
      }
    } catch(e) {
      console.log(e)
    }
    return years
  }

  async addCD4() {
    try {
      let response = await fetch('https://h4home-924ba.firebaseapp.com/addCD4', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year: this.year
        }),
      })

      let res = await response.text();
      if(response.status>=200&& response.status < 300) {
        console.log(res);
        if(res == "Saved to db"){
          console.log("Nice");
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
