import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs';

import { DiceModule } from '../dice/dice.module';
import { ArmouryModule } from '../armoury/armoury.module';
import { WorldInfoModule } from '../world-info/world-info.module';
import { PlayerProfileModule } from '../player-profile/player-profile.module';
@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [

    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    DiceModule,
    ArmouryModule,
    WorldInfoModule,
    PlayerProfileModule
  ]
})
export class DashboardModule {


}
