import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PillReminderPage } from '../pill-reminder/pill-reminder';
import { AppointmentPage } from '../appointment/appointment';
import { RefillPage } from '../refill/refill';
import { ViralLoadPage } from '../viral-load/viral-load';
import { Cd4TrackingPage } from '../cd4-tracking/cd4-tracking';

@IonicPage()
@Component({
  selector: 'page-medication',
  templateUrl: 'medication.html',
})
export class MedicationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicationPage');
  }

  goToDashboard(){
    this.navCtrl.setRoot('DashboardPage');
  }

  pillReminderPage = PillReminderPage;
  appointmentPage = AppointmentPage;
  refillPage = RefillPage;
  viralLoadPage = ViralLoadPage;
  cd4TrackingPage = Cd4TrackingPage;

}
