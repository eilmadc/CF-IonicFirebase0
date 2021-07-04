import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { firebaseConfig } from 'src/environments/firebaseconfig';
import { AngularFireModule } from '@angular/fire';

//Modulo de auntenticacion
import { AngularFireAuthModule} from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StatusBar } from '@capacitor/status-bar';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig),
  AngularFireAuthModule, AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
