import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';

import { ListTreatmentPage } from '../pages/list-treatment/list-treatment';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ChangePasswordPage } from '../pages/login/change-password/change-password';
import { RegisterPage } from '../pages/login/register/register';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StaffPage } from '../pages/staff/staff';
import { ProfilePage } from '../pages/profile/profile';
import { BookingPage } from '../pages/booking/booking';
import { ProfileSettingPage } from '../pages/profile-setting/profile-setting';
import { HistoryBookingPage } from '../pages/history-booking/history-booking';
import { ListCustomerTreatment } from '../pages/list-customer-treatment/list-customer-treatment';
import { ActiveBookingPage } from '../pages/list-customer-treatment/active-booking/active-booking';
import { PastBookingPage } from '../pages/list-customer-treatment/past-booking/past-booking';
import { MyBookingPage } from '../pages/my-booking/my-booking';
import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { Geolocation } from '@ionic-native/geolocation';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RestapiServiceProvider } from '../providers/restapi-service/restapi-service';

import { NativeStorage } from '@ionic-native/native-storage';

import { AlertService } from '../providers/shared-service/alert-service';
import { ToastService } from '../providers/shared-service/toast-service';
import { LoaderService } from '../providers/shared-service/loader-service';

import { CacheModule } from 'ionic-cache';

import { PayPal } from '@ionic-native/paypal';

import { PhoneSalonPage } from '../pages/list-treatment/phone-salon/phone-salon';

@NgModule({
  declarations: [
    MyApp,
    ListTreatmentPage,
    ActiveBookingPage,
    PastBookingPage,
    PhoneSalonPage,
    ContactPage,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ChangePasswordPage,
    StaffPage,
    ProfilePage,
    BookingPage,
    HistoryBookingPage,
    MyBookingPage,
    ProfileSettingPage,
    ListCustomerTreatment
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonIcon: 'custom-back',
      backButtonText: ''
    }),
    CacheModule.forRoot(),
    Ionic2RatingModule,
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListTreatmentPage,
    ActiveBookingPage,
    PastBookingPage,
    PhoneSalonPage,
    ContactPage,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ChangePasswordPage,
    StaffPage,
    ProfilePage,
    BookingPage,
    HistoryBookingPage,
    MyBookingPage,
    ProfileSettingPage,
    ListCustomerTreatment
  ],
  providers: [
    Angular2TokenService,
    StatusBar,
    SplashScreen,
    PayPal,
    Geolocation,
    AuthServiceProvider,
    RestapiServiceProvider,
    NativeStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AlertService,
    ToastService,
    LoaderService
  ]
})
export class AppModule { }
