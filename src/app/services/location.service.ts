import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private database: AngularFirestore,
    public alertController: AlertController
    ) { }

  //Referencia de la coleccion a la que apuntamos.
  BDRef = this.database.collection('visited');


  /* Leer localizaciones( Para leer las localizaciones, debemos ir revisando los cambios que se vayan realizando),
  esto lo hacemos con SnapshotChanges*/
  readLocations(){
    return this.BDRef.snapshotChanges().pipe(map(locations =>{
      return locations.map(location => {
        const data = location.payload.doc.data();
        const id = location.payload.doc.id;
        return {id,data};
      })
    }))
  }

  /* Crear Locations en coleccion "visited" de Firestore */
  createLocation(refc: String,latitude:number,longitude:number){
    this.BDRef.add({
      RefC:refc,
      latitude: latitude,
      longitude:longitude,
    }).then(()=>{
      console.log("Location created sucess")
    }).catch(err=> console.log(err.message));
  }
  
  updateLocation(id:string, refc:string){
    this.BDRef.doc(id).update({
      RefC:refc
    })
  }


  //Components:
  //Alerta para la creacion de nuevo registro en Firestore
  async addLocationAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Añade Nuevo Registro!',
      inputs: [
        {
          name: 'RefC',
          type: 'text',
          placeholder: 'Referencia Catastral'
        },
        {
          name: 'latitude',
          type: 'number',
          placeholder: 'Latitude'
        },
        {
          name: 'longitude',
          type: 'number',
          placeholder: 'Longitude'
        },
        {
          name: 'date',
          type: 'date'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (location) => {
            console.log(location.RefC);
            this.createLocation(location.RefC, location.latitude, location.longitude);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

    //Alerta para la creacion de nuevo registro en Firestore
  async updateLocationAlert(id:string, refc:string) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Actualizar Registro:',
        inputs: [
          {
            name: 'id',
            type: 'text',
            value: id
          },
          {
            name: 'RefC',
            type: 'text',
            value: refc
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (location) => {
              console.log(location.RefC);
              this.updateLocation(id,location.refc);
              console.log('Confirm Ok');
            }
          }
        ]
      });
  
      await alert.present();
  }

}
