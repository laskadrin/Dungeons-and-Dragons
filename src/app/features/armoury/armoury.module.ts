import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArmouryRoutingModule } from './armoury-routing.module';
import { ArmouryComponent } from './armoury.component';
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    ArmouryComponent
  ],
  imports: [
    CommonModule,
    ArmouryRoutingModule,
    MatTableModule,
    MatTabsModule
  ],
  exports: [
    ArmouryComponent
  ]
})
export class ArmouryModule { }
