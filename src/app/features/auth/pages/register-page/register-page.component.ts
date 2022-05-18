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
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  register(data: LoginData) {
    this.errorCode = ''
    this.authService
      .register(data)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((e) => this.errorCode = e.code);
  }

}
