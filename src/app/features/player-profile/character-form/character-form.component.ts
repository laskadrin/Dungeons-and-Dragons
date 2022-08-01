import { PlayerProfileComponent } from './../player-profile.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getDatabase, ref, set, get } from 'firebase/database';
import { getAuth } from '@angular/fire/auth';
import { Char } from 'src/app/core/interfaces/char';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements OnInit {

  statsPrimary = ['str', 'dex', 'con', 'int', 'wis', 'cha']
  statsSecondary = ['acro', 'athl', 'magi', 'dece', 'hist', 'perc', 'inti', 'inve', 'medi', 'natu',
    'perc1', 'perf', 'conv', 'reli', 'lege', 'secr', 'surv', 'pett']

  newCharacterForm: FormGroup;


  constructor(

    private fb: FormBuilder,
    private PlayerProfileComponent: PlayerProfileComponent
  ) { }

  ngOnInit(): void {
    const stats = [...this.statsPrimary, ...this.statsSecondary]
    const formValue: any = { name: 'Новачок', inventory: 'Пусто', abilities: 'Жодних вмінь', additionary: 'Жодних особливостей', health: 0, armour: 0 };
    for (const stat of stats) {
      formValue[stat] = 0
    }

    this.newCharacterForm = this.fb.group(formValue);
  }



  dbRef = ref(getDatabase());

  userID = getAuth().currentUser?.uid
  characters: { [name in string]: Char };

  createCharacter() {
    const db = getDatabase();

    set(ref(db, 'users/' + this.userID + '/characters'), {
      ...this.PlayerProfileComponent.characters,
      ...{ [this.newCharacterForm.value.name]: this.newCharacterForm.value }
    })
    this.PlayerProfileComponent.getCharactersFromDB();
    this.PlayerProfileComponent.newCharacterForm = !this.PlayerProfileComponent.newCharacterForm
  }


}
