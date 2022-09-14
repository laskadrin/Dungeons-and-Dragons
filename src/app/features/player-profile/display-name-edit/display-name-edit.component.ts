import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, updateProfile } from '@angular/fire/auth';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-display-name-edit',
  templateUrl: './display-name-edit.component.html',
  styleUrls: ['./display-name-edit.component.css']
})
export class DisplayNameEditComponent implements OnInit {

  @Output() nameFormData: EventEmitter<{
    name: string
  }> = new EventEmitter();
  nameForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dashboardComponent: DashboardComponent
  ) { }

  user = getAuth().currentUser;
  displayName = getAuth().currentUser?.displayName;
  displayNameChangeActive: boolean = false;

  errorCode: string = '';

  changeNameMessage: string = '';
  successNameMessage: string = '';
  errorNameOccured: boolean = false;

  ngOnInit(): void {
    this.nameForm = this.fb.group({
      newDisplayName: ['', Validators.required]
    })
  }

  get newDisplayName() {
    return this.nameForm.get('newDisplayName')
  }

  onSubmitName() {
    if (this.nameForm.valid && this.displayNameChangeActive) {
      this.nameFormData.emit(this.nameForm.value);
      this.changeDisplayName();
    }
  }

  changeDisplayName() {
    console.log('Name change button clicked');
    this.errorNameOccured = false;
    this.changeNameMessage = '';
    this.successNameMessage = '';
    if (this.user) {
      updateProfile(this.user, { displayName: this.newDisplayName?.value }).then(() => {
        this.displayName = this.newDisplayName?.value;
        this.dashboardComponent.getDisplayName();
        this.successNameMessage = 'Псевдонім успішно зміненно';
        this.displayNameChangeActive = !this.displayNameChangeActive;
      }).catch((e) => {
        this.errorNameOccured = true;
        this.changeNameMessage = 'При зміні псевдоніму сталась помилка. Спробуйте, будь ласка, пізніше' + e.code;
      })
    }

  }
  displayNameFormButton() {
    this.displayNameChangeActive = !this.displayNameChangeActive;
    this.changeNameMessage = '';
    this.successNameMessage = '';
  }

}
