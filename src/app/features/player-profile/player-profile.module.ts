import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerProfileRoutingModule } from './player-profile-routing.module';
import { PlayerProfileComponent } from './player-profile.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlayerProfileComponent
  ],
  imports: [
    CommonModule,
    PlayerProfileRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    ReactiveFormsModule,

  ],
  exports: [
    PlayerProfileComponent
  ]
})
export class PlayerProfileModule { }
