import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/core/services/shared/characters.service';
import { Char } from 'src/app/core/interfaces/char';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getAuth } from '@angular/fire/auth';

import { from, Observable } from 'rxjs';

import { child, getDatabase, ref, set, get } from 'firebase/database';
import { observable } from 'rxjs';


import { remove } from '@angular/fire/database';





@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})

export class PlayerProfileComponent implements OnInit {

  statsPrimary = ['str', 'dex', 'con', 'int', 'wis', 'cha']
  statsSecondary = ['acro', 'athl', 'magi', 'dece', 'hist', 'perc', 'inti', 'inve', 'medi', 'natu',
    'perc1', 'perf', 'conv', 'reli', 'lege', 'secr', 'surv', 'pett']

  editCharacterForm: FormGroup;

  constructor(

    private fb: FormBuilder,
    public dashboardComponent: DashboardComponent,

  ) { }



  userID = getAuth().currentUser?.uid


  newCharacterForm: boolean = false;

  ngOnInit(): void {
    this.getCharactersFromDB();
    if (this.selectedCharacterName) {
      const stats = [...this.statsPrimary, ...this.statsSecondary]
      const formValue: any = this.characters[this.selectedCharacterName]
      this.editCharacterForm = this.fb.group(formValue);
    }
  }

  db = getDatabase();
  dbRef = ref(getDatabase());

  characters: { [name in string]: Char };

  selectedCharacterName: string;

  getCharactersFromDB() {
    this.selectedCharacterName = '';
    get(child(this.dbRef, 'users/' + this.userID + '/characters')).then((snapshot) => {
      if (snapshot.exists()) {
        this.characters = snapshot.val()

        console.log(this.characters[this.selectedCharacterName])
      }
      else {
        this.characters = {};
      }

    }).catch((e) => {
      console.error(e)
    })

  }

  checker() {
    if (this.newCharacterForm == true) {
      this.newCharacterForm = false
    }
  }

  deleteCharacter() {
    remove(ref(this.db, 'users/' + this.userID + '/characters/' + this.selectedCharacterName));

    this.getCharactersFromDB();
  }

  editCharacter() {
    const db = getDatabase();

    set(ref(db, 'users/' + this.userID + '/characters' + this.selectedCharacterName), {
      [this.editCharacterForm.value.name]: this.editCharacterForm.value
    })
    this.getCharactersFromDB();
  }
}
