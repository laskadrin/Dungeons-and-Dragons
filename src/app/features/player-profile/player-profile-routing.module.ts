import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerProfileComponent } from './player-profile.component';

const routes: Routes = [{ path: '', component: PlayerProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerProfileRoutingModule { }
