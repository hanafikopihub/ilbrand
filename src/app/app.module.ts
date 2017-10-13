import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ListTreatmentPage } from '../pages/list-treatment/list-treatment';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { MybookPage } from '../pages/mybook/mybook';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StaffPage } from '../pages/staff/staff';
import { ProfilePage } from '../pages/profile/profile';
import { CartPage } from '../pages/cart/cart';
import { BookingPage } from '../pages/booking/booking';

import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { Geolocation } from '@ionic-native/geolocation';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RestapiServiceProvider } from '../providers/restapi-service/restapi-service';

import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    ListTreatmentPage,
    ContactPage,
    HomePage,
    ListPage,
    LoginPage,
    MybookPage,
    StaffPage,
    ProfilePage,
    CartPage,
    BookingPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListTreatmentPage,
    ContactPage,
    HomePage,
    ListPage,
    LoginPage,
    MybookPage,
    StaffPage,
    ProfilePage,
    CartPage,
    BookingPage
  ],
  providers: [
    Angular2TokenService,
    StatusBar,
    SplashScreen,
    Geolocation,
    AuthServiceProvider,
    RestapiServiceProvider,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
