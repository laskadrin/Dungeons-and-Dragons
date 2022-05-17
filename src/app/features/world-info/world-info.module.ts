import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar'

import { WorldInfoRoutingModule } from './world-info-routing.module';
import { WorldInfoComponent } from './world-info.component';


@NgModule({
  declarations: [
    WorldInfoComponent
  ],
  imports: [
    CommonModule,
    WorldInfoRoutingModule,
    MatTabsModule,
    MatToolbarModule
  ],
  exports: [
    WorldInfoComponent
  ]
})
export class WorldInfoModule { }
