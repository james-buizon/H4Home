import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { MedicationPage } from '../pages/medication/medication';
import { DrugInfoPage } from '../pages/drug-info/drug-info';

import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import {FIREBASE_CONFIG} from "./app.firebase.config";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HivInfoPage } from '../pages/hiv-info/hiv-info';
import { PharmacyPage } from '../pages/pharmacy/pharmacy';
import { OthersPage } from '../pages/others/others';

import { TreatmentHubPage } from '../pages/treatment-hub/treatment-hub';
import { TestingSitePage } from '../pages/testing-site/testing-site';

import { DrugInformationPage } from '../pages/drug-information/drug-information';
import { GlossaryPage } from '../pages/glossary/glossary';

import { GuidelinesPage } from '../pages/guidelines/guidelines';
import { NewsAndUpdatesPage } from '../pages/news-and-updates/news-and-updates';
import { OtherInfoPage } from '../pages/other-info/other-info';
import { PreventionPage } from '../pages/prevention/prevention';
import { AppointmentPage } from '../pages/appointment/appointment';
import { PillReminderPage } from '../pages/pill-reminder/pill-reminder';
import { RefillPage } from '../pages/refill/refill';
import { ViralLoadPage } from '../pages/viral-load/viral-load';
import { Cd4TrackingPage } from '../pages/cd4-tracking/cd4-tracking';
import { AddValuePage } from '../pages/add-value/add-value';
import { SpecificDrugInfoPage } from '../pages/specific-drug-info/specific-drug-info';
import { SpecificOtherInfoPage } from '../pages/specific-other-info/specific-other-info';
import { SpecificPreventionPage } from '../pages/specific-prevention/specific-prevention';

import { NgCalendarModule } from 'ionic2-calendar';
import { ChartsModule } from 'ng2-charts';
import { IonicStorageModule } from '@ionic/storage';
import { SaveAppointmentPageModule } from '../pages/save-appointment/save-appointment.module';
import { ReportsPageModule } from '../pages/reports/reports.module';
import { AddMedicinePageModule } from '../pages/add-medicine/add-medicine.module';
import { ChangePwPageModule } from '../pages/change-pw/change-pw.module';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { FcmProvider } from '../providers/fcm/fcm';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MedicationPage,
    DrugInfoPage,
    HivInfoPage,
    PharmacyPage,
    OthersPage,
    TreatmentHubPage,
    TestingSitePage,
    DrugInformationPage,
    GlossaryPage,
    GuidelinesPage,
    NewsAndUpdatesPage,
    OtherInfoPage,
    PreventionPage,
    PillReminderPage,
    AppointmentPage,
    RefillPage,
    ViralLoadPage,
    Cd4TrackingPage,
    AddValuePage,
    SpecificDrugInfoPage,
    SpecificOtherInfoPage,
    SpecificPreventionPage,
  ],
  imports: [
    ChartsModule,
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    SaveAppointmentPageModule,
    ReportsPageModule,
    AddMedicinePageModule,
    IonicStorageModule.forRoot(),
    ChangePwPageModule,
    DashboardPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MedicationPage,
    DrugInfoPage,
    HivInfoPage,
    PharmacyPage,
    OthersPage,
    TreatmentHubPage,
    TestingSitePage,
    DrugInformationPage,
    GlossaryPage,
    GuidelinesPage,
    NewsAndUpdatesPage,
    OtherInfoPage,
    PreventionPage,
    PillReminderPage,
    AppointmentPage,
    RefillPage,
    ViralLoadPage,
    Cd4TrackingPage,
    AddValuePage,
    SpecificDrugInfoPage,
    SpecificOtherInfoPage,
    SpecificPreventionPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    BackgroundMode,
    FcmProvider
  ]
})
export class AppModule {}
