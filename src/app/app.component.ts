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
        deviceToken = data.registrationId;

        if (platform.is('ios')) {
          deviceOs = 'customappios'
        }else{
          deviceOs = 'customappandroid'
        }

        this._restapiServiceProvider.setupDeviceToken(deviceToken, deviceOs, '', AppApi.SALON_ID).subscribe(response => {
          console.log(response);
        },
        (error) => {
          console.log(error);
          return;
        });
        localStorage.setItem('device_token', deviceToken);
      },
       (error) => {
        console.log(error);
        return;
      });

      pushObject.on('notification').subscribe((data: any) => {
        const additionalData = JSON.parse(JSON.stringify(data.additionalData));
        const treatment = {s_treatment_id: additionalData.s_treatment_id, 
          price: additionalData.treatment_price, 
          duration: additionalData.treatment_duration,
          des_treatment: additionalData.treatment_name
        };
        const salon = {salon_id: additionalData.salon_id, 
          city: additionalData.salon_city, 
          address: additionalData.salon_address
        };

        if (data.additionalData.foreground) {
          if(treatment.s_treatment_id != null){
            var buttonsData = [
              {
                text: 'Ignora',
                role: 'cancel'
              }, 
              {
                text: 'Scopri',
                handler: () => {
                  this.nav.push('BookingPage', { treatment: treatment, salon: salon, status: false });
                }
              }
            ];
          }else{
            var buttonsData = [
              {
                text: 'Ignora',
                role: 'cancel'
              }, 
              {
                text: 'Scopri',
                handler: () => {
                  this.nav.push('HomePage');
                }
              }
            ];
          }

          let confirmAlert = this._alertCtrl.create({
            title: data.title,
            message: data.message,
            buttons: buttonsData
          });
          confirmAlert.present();
        }else {
          if(treatment.s_treatment_id == null){
            this.nav.push('HomePage');
          }else{
            this.nav.push('BookingPage', { treatment: treatment, salon: salon, status: false });
          }
        }
      });
    });
  }

}
