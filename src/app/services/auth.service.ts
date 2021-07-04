import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private Auth: AngularFireAuth,
    private router:Router) { }

  loginUserEmail(email:string, password: string){
    this.Auth.signInWithEmailAndPassword(email, password).then(user =>{
      console.log(user.user.email);
      this.router.navigate(['/home']);
    }).catch(err => console.log(err.message));
  }

  logout(){
    this.Auth.signOut().then(() => {
      console.log("Esperamos verte pronto");
      this.router.navigate(['/login']);
    }).catch(err => console.log(err.message));
  }
}
