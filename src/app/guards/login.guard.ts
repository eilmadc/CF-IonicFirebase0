import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private route:Router
  ){}

  canActivate(){
      let userAuth = this.authService.isAuthenticated();
      console.log("UserAuth:" + userAuth);
      if (userAuth){
        console.log("Autenticado");
        return true;
      }else{
        console.log("No autenticado");
        this.route.navigate(["/login"]);
        return false;
      }
    } 
}
