import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  loginUserEmail(email:string, password: string){
    this.auth.signInWithEmailAndPassword(email, password);
  }

}
