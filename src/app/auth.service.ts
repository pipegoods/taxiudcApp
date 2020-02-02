import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from './shared/services/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: User = {
    displayName : '',
    uid: '',
    phoneNumber: '',
    photoURL: '',
    email: '',
    emailVerified: false
  }; // Save logged in user data
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        userRef.valueChanges().subscribe(e => {
          console.log(e);
          
          this.userData.displayName = e.displayName;
          this.userData.uid = e.uid;
          this.userData.photoURL = e.photoURL;
          this.userData.emailVerified = e.emailVerified;
          this.userData.phoneNumber = e.phoneNumber;
          this.userData.email = e.email;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
          
        });
        
        
        
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      
       
      this.SetUserData(result.user);
      
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    userRef.valueChanges().subscribe(e => {
      console.log(e); 
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        phoneNumber: (user.phoneNumber != null) ? user.phoneNumber : e.phoneNumber
      }
      
      return userRef.set(userData, {
        merge: true
      }).finally(() => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
      });
    });
    
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.userData= {
        displayName : '',
        uid: '',
        phoneNumber: '',
        photoURL: '',
        email: '',
        emailVerified: false
      }; 
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

}