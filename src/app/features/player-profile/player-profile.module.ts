import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerProfileRoutingModule } from './player-profile-routing.module';
import { PlayerProfileComponent } from './player-profile.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StorageModule } from '@angular/fire/storage';
import { CharacterFormComponent } from './character-form/character-form.component'
import { StatsTranslationPipe } from 'src/app/core/interfaces/pipes/stats-translation.pipe';


@NgModule({
  declarations: [
    PlayerProfileComponent,
    CharacterFormComponent,
    StatsTranslationPipe
  ],
  imports: [
    CommonModule,
    PlayerProfileRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    StorageModule

  ],
  exports: [
    PlayerProfileComponent
  ]
})
export class PlayerProfileModule { }
