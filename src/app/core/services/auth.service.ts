import { Auth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';

import { Injectable, OnInit } from '@angular/core';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {



  constructor(private auth: Auth) { }

  logged: boolean = false;
  username: string = '';
  login({ email, password }: LoginData) {
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

  isLoggedIn({ email }: LoginData) {
    this.username = user.name;
    this.logged = true;
  }

}
