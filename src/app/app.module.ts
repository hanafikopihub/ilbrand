import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RestapiServiceProvider } from '../providers/restapi-service/restapi-service';

import { AlertService } from '../providers/shared-service/alert-service';
import { ToastService } from '../providers/shared-service/toast-service';
import { LoaderService } from '../providers/shared-service/loader-service';

import { CacheModule } from 'ionic-cache';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonIcon: 'custom-back',
      backButtonText: ''
    }),
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    InAppBrowser,
    SplashScreen,
    Angular2TokenService,
    AuthServiceProvider,
    RestapiServiceProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AlertService,
    ToastService,
    LoaderService
  ]
})
export class AppModule { }
