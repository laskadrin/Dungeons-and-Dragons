import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { LoginData } from 'src/app/core/interfaces/login-data.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  errorCode: string = '';
  regMessage: string = '';
  errorOccured: boolean = false;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,

  ) { }

  ngOnInit(): void {
  }

  register(data: LoginData) {
    this.errorCode = ''
    this.authService
      .register(data)
      .then(() => {
        this.regMessage = 'Success! Redirecting to sign in page.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000)

      })
      .catch((e) => {
        this.errorCode = e.code;
        if (this.errorCode == 'auth/email-already-in-use') {
          this.errorOccured = true;
          this.regMessage = 'Sorry, email already exists';
        } else
          if (this.errorCode == 'auth/weak-password') {
            this.errorOccured = true;
            this.regMessage = 'Sorry, password is too weak';
          } else
            if (this.errorCode == 'auth/invalid-email') {
              this.errorOccured = true;
              this.regMessage = 'Sorry, email is invalid';
            } else {
              this.errorOccured = true;
              this.regMessage = 'Unknown error, please try again later';
            };
      });
  }



}
