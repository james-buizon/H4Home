import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { MedicationPage } from '../medication/medication';
import { DrugInfoPage } from '../drug-info/drug-info';
import { HivInfoPage } from '../hiv-info/hiv-info';
import { PharmacyPage } from '../pharmacy/pharmacy';
import { OthersPage } from '../others/others';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private afAuth: AngularFireAuth, private toast:ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

      ionViewDidLoad() {
        this.toast.create({
                message: 'Welcome to H4HOME!',
                duration: 1500
            }).present();
        // this.afAuth.authState.subscribe(data => {
        //     if(data && data.email && data.uid){
        //         this.toast.create({
        //         message: 'Welcome to H4HOME!',
        //         duration: 1500
        //     }).present();
        //     }
        //     else{
        //         this.toast.create({
        //         message: 'Could not find authentication details',
        //         duration: 2000
        //     }).present();
        //     }
        // });

       }



       medicationPage = MedicationPage;
       drugInfoPage = DrugInfoPage;
       hivInfoPage = HivInfoPage;
       pharmacyPage = PharmacyPage;
       othersPage = OthersPage;
}
