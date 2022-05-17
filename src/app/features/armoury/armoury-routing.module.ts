import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArmouryComponent } from './armoury.component';

const routes: Routes = [{ path: '', component: ArmouryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArmouryRoutingModule { }
