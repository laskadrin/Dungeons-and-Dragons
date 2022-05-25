import { Auth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';

import { Injectable, OnInit } from '@angular/core';
import { LoginData } from '../interfaces/login-data.interface';
import { of } from 'rxjs';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {



  constructor(private auth: Auth) { }

  user = getAuth().currentUser;
  logged: boolean = false;
  username: string = '';
  login({ email, password }: LoginData) {
    this.user = null;
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  register({ email, password }: LoginData) {

    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  logout() {

    return signOut(this.auth)

  }
  isAdmin() {
    this.user = getAuth().currentUser;
    if (this.user && this.user.uid === 'rX9wkrVRqDYuOH8V2JnFARSknMn2') { return true }
    else { return false }
  }


  isLoggedIn({ email }: LoginData) {
    this.username = user.name;
    this.logged = true;
  }

}
