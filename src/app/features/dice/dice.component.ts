import { user } from 'rxfire/auth';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { interval } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { child, getDatabase, ref, set, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  constructor() { }
  result: number = 0;
  rollingProgress: string = '0';
  diceSize: number = 20;
  diceSizes: number[] = [4, 6, 8, 12, 20, 100];
  isRolling: boolean = false;
  user = getAuth().currentUser;
  displayName = this.user?.displayName
  db = getDatabase()
  dbRef = ref(this.db);
  databaseRollObj = {
    person: '',
    size: '',
    result: ''
  };


  customDiceSizeFormControl = new FormControl(50);

  chooseDiceSize(size: number) {
    this.diceSize = size;
  }

  rollCustomDiceSize() {
    this.result = Math.ceil(Math.random() * this.customDiceSizeFormControl.value)
    this.rollFunction();

  }


  diceRoll() {
    this.result = Math.ceil(Math.random() * this.diceSize)
    this.rollFunction();

  }

  rollFunction() {
    this.rollingProgress = 'Кидаємо'
    this.isRolling = true
    const intervalSubscription = interval(300).subscribe((i) => {
      if (i === 3) {
        this.isRolling = false;
        intervalSubscription.unsubscribe();
      }
      else {
        this.rollingProgress += '.'
      }
    })
  }

  ngOnInit(): void {

  }



}
