import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiceRoutingModule } from './dice-routing.module';
import { DiceComponent } from './dice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DiceComponent
  ],
  imports: [

    CommonModule,
    DiceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DiceComponent
  ]

})
export class DiceModule { }
