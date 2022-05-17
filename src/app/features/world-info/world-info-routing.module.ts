import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldInfoComponent } from './world-info.component';

const routes: Routes = [{ path: '', component: WorldInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldInfoRoutingModule { }
