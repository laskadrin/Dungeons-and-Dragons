import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/core/services/shared/characters.service';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  constructor(
    public dashboardComponent: DashboardComponent
  ) { }
  pseudoname: string | undefined | null = this.dashboardComponent.hiuser;
  email: string | undefined | null = this.dashboardComponent.hiuser;
  password: string;
  ngOnInit(): void {
  }

}
