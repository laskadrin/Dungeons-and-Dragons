import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/core/services/shared/characters.service';
@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
