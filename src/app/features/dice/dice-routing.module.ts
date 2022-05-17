import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiceComponent } from './dice.component';

const routes: Routes = [{ path: '', component: DiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiceRoutingModule { }
