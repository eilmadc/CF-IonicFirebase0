import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  locations:any = [];

  constructor(
    private authService: AuthService,
    private locationService: LocationService
    ) {  }

    ngOnInit(){
      this.showLocations();
    }

  logOut(){
    this.authService.logout();
  }

  showLocations(){
    this.locationService.readLocations().subscribe(locations =>{
      this.locations = locations;
    })
  }

  addLocation(){
    this.locationService.addLocationAlert();
  }

  updateLocation(location: any){
    console.log("id:"+location.id);
    console.log("refc:"+location.RefC);
    this.locationService.updateLocationAlert(location.id,location.refc);
  }
}
