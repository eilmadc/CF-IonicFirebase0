import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private Database: AngularFirestore,
    private router:Router) { }

  isAuthenticated(){
    return this.auth.isSignInWithEmailLink !;
  }

  loginUserEmail(email:string, password: string){
    this.auth.signInWithEmailAndPassword(email, password).then(user =>{
      console.log(user.user.email);
      this.router.navigate(['/home']);
    }).catch(err => console.log(err.message));
  }

  createUserEmail(email:string, password:string, name: string){
    this.auth.createUserWithEmailAndPassword(email,password).then((user) =>{
      console.log(user);
      const uid = user.user.uid
      console.log(uid);
      this.router.navigate(['/home']);
      this.Database.collection('users').doc(uid).set({
        uid: uid,
        name: name,
        email: email
      }).then(() => {
        console.log("Usuario creado correctamente");
        this.router.navigate(['home']);
      }).catch(err => console.log(err.message));
    }).catch(err => console.log(err.message));
  } 

  logout(){
    this.auth.signOut().then(() => {
      console.log("Esperamos verte pronto");
      this.router.navigate(['/login']);
    }).catch(err => console.log("Error: " + err.message));
  }
}
