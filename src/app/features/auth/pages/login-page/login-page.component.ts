import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { LoginData } from 'src/app/core/interfaces/login-data.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  errorCode: string = '';
  loginMessage: string = '';
  errorOccured: boolean = false;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => {
        console.log(e.code)
        this.errorCode = e.code;
        if (this.errorCode == 'auth/user-not-found') {
          this.errorOccured = true;
          this.loginMessage = 'Користувача не знайдено. Перевірте правильність написання електронної пошти або, якщо ви цього ще не зробили,  зареєструйтесь';
        } else if (this.errorCode == 'auth/wrong-password') {
          this.errorOccured = true;
          this.loginMessage = 'Ви ввели неправильний пароль'
        } else {
          this.errorOccured = true;
          this.loginMessage = 'Невідома помилка. Будь ласка, посторіть спробу входу пізніше'
        }
      });
  }
  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));
  }

}
