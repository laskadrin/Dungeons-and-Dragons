import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  isAdmin: boolean = false;
  ngOnInit(): void {

    this.isAdmin = this.authService.isAdmin();
  }

  hiuser = getAuth().currentUser?.displayName;
  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }

}
