import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { AppApi } from '../app.api';
import { RestapiServiceProvider } from '../providers/restapi-service/restapi-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'HomePage';

  constructor(private push: Push, 
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    public _restapiServiceProvider: RestapiServiceProvider,
    public _alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      if(platform.is('android') || platform.is('tablet')){
        statusBar.overlaysWebView(false);  
      }
      splashScreen.hide();

      if (!platform.is('cordova')) {
        console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
        return;
      }
      const options: PushOptions = {
        ios: {
          alert: 'true',
          badge: false,
          sound: 'true'
        }
      };
      const pushObject: PushObject = this.push.init(options);
      var deviceOs = '';
      var deviceToken = '';

      pushObject.on('registration').subscribe((data: any) => {
        console.log('device token -> ' + data.registrationId);
        deviceToken = data.registrationId;
        //TODO - send device token to server

        if (platform.is('ios')) {
          deviceOs = 'customappios'
        }else{
          deviceOs = 'customappandroid'
        }

        this._restapiServiceProvider.setupDeviceToken(deviceToken, deviceOs, '', AppApi.SALON_ID).subscribe(response => {
          console.log(response);
        },
        (error) => {
          // handle error
          console.log(error);
          return;
        });
        // localStorage.setItem('device_token', {device_token: deviceToken, device_os: deviceOs});
      },
       (error) => {
        // handle error
        console.log(error);
        return;
      });

      pushObject.on('notification').subscribe((data: any) => {
        console.log('message -> ' + data.message);
        // if user using app and push notification comes
        if (data.additionalData.foreground) {
          // if application open, show popup
          let confirmAlert = this._alertCtrl.create({
            title: 'New Notification',
            message: data.message,
            buttons: [{
              text: 'Ignore',
              role: 'cancel'
            }, {
              text: 'View',
              handler: () => {
                console.log('Push notification clicked');
                // this.nav.push('BookingPage', { treatment: treatment, salon: this.salon, status: this.fromModal });
              }
            }]
          });
          confirmAlert.present();
        }else {
          // if user NOT using app and push notification comes
          // this.nav.push('BookingPage', { treatment: treatment, salon: this.salon, status: this.fromModal });
          console.log('Push notification clicked');
        }
      });

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
    });
  }

}
