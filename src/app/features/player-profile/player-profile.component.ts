import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CharactersService } from 'src/app/core/services/shared/characters.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, updateEmail, updatePassword, getAuth, reauthenticateWithCredential, EmailAuthProvider } from '@angular/fire/auth';
import { user } from 'rxfire/auth';
import { updateProfile } from 'firebase/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  @Output() formData: EventEmitter<{
    password: string;
  }> = new EventEmitter();
  passwordForm: FormGroup;


  @Output() nameFormData: EventEmitter<{
    name: string
  }> = new EventEmitter();
  nameForm: FormGroup;

  @Output() emailFormData: EventEmitter<{
    email: string;
    password: string;
  }> = new EventEmitter;
  emailForm: FormGroup;


  constructor(

    private fb: FormBuilder,
    public dashboardComponent: DashboardComponent
  ) { }



  user = getAuth().currentUser;

  newUserPassword: string;
  newUserEmail: string;

  displayName = getAuth().currentUser?.displayName;
  email = getAuth().currentUser?.email;

  passwordChangeActive: boolean = false;
  displayNameChangeActive: boolean = false;
  emailChangeActive: boolean = false;

  errorCode: string = '';

  changeMessage: string = '';
  successMessage: string = ' ';
  errorOccured: boolean = false;

  changeNameMessage: string = '';
  successNameMessage: string = '';
  errorNameOccured: boolean = false;

  changeEmailMessage: string = '';
  successEmailMessage: string = '';
  errorEmailOccured: boolean = false;

  photoPath = '';



  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', Validators.required]
    });
    this.nameForm = this.fb.group({
      newDisplayName: ['', Validators.required]
    })
    this.emailForm = this.fb.group({
      newEmail: ['', Validators.required],
      newEmailConfirm: ['', Validators.required],
      newEmailPassword: ['', Validators.required]
    })
    if (this.photoPath == '') {
      this.photoPath = '../../../assets/default-profile-avatar.png'
    }
  }

  get oldPassword() {
    return this.passwordForm.get('oldPassword')
  }
  get newPassword() {
    return this.passwordForm.get('newPassword')
  }
  get newPasswordConfirm() {
    return this.passwordForm.get('newPasswordConfirm')
  }

  get newDisplayName() {
    return this.nameForm.get('newDisplayName')
  }

  get newEmail() {
    return this.emailForm.get('newEmail')
  }
  get newEmailConfirm() {
    return this.emailForm.get('newEmailConfirm')
  }
  get newEmailPassword() {
    return this.emailForm.get('newEmailPassword')
  }

  onSubmitPassword() {
    if (this.passwordForm.valid && this.passwordChangeActive) {
      this.formData.emit(this.passwordForm.value);
      this.changePassword();
    }


  }
  onSubmitName() {
    if (this.nameForm.valid && this.displayNameChangeActive) {
      this.nameFormData.emit(this.nameForm.value);
      this.changeDisplayName();
    }
  }
  onSubmitEmail() {
    if (this.emailForm.valid && this.emailChangeActive) {
      this.emailFormData.emit(this.nameForm.value);
      this.changeEmail();
    }
  }

  changePassword() {
    console.log('Password change button clicked');
    this.errorOccured = false;
    this.changeMessage = '';
    this.successMessage = ''
    this.newUserPassword = this.newPassword?.value;
    if (this.newPassword?.value == this.newPasswordConfirm?.value) {
      if (this.user && typeof this.email == 'string') {

        const credential = EmailAuthProvider.credential(
          this.email,
          this.oldPassword?.value
        )
        reauthenticateWithCredential(this.user, credential).then(() => {
          if (this.user) {
            updatePassword(this.user, this.newUserPassword).then(() => {
              this.passwordChangeActive = false;
              this.successMessage = 'Ви успішно змінили пароль для входу у ваш акаунт'
              console.log('change successful')
            }).catch((e) => {
              console.log(e.code);
              this.errorOccured = true;
              this.errorCode = e.code;
              if (this.errorCode == 'auth/weak-password') {

                this.changeMessage = 'Новий пароль заслабкий. Введіть принаймні 6 символів';
              }
              else {

                this.changeMessage = 'Невідома помилка. Будь ласка, повторіть спробу пізніше';
              };
            });
          }
        }).catch((e) => {
          console.log(e.code);
          this.errorOccured = true;
          this.errorCode = e.code;
          if (this.errorCode == 'auth/wrong-password') {

            this.changeMessage = 'Ваш старий пароль введено неправильно.'
          } else {

            this.changeMessage = 'Невідома помилка. Будь ласка, повторіть спробу входу пізніше (Помилка реавторизації)'
          }

        })
      }
    } else {
      this.errorOccured = true;
      this.changeMessage = 'Паролі не співпадають'
    }

  }
  passwordFormButton() {
    this.passwordChangeActive = !this.passwordChangeActive;
    this.changeMessage = ''
  }

  changeEmail() {
    console.log('Email change button clicked')
    this.errorEmailOccured = false;
    this.changeEmailMessage = '';
    this.successEmailMessage = '';
    if (this.newEmail?.value == this.newEmailConfirm?.value) {
      if (this.user && typeof this.email == 'string') {
        const credential = EmailAuthProvider.credential(
          this.email,
          this.newEmailPassword?.value
        )
        reauthenticateWithCredential(this.user, credential).then(() => {
          if (this.user) {
            updateEmail(this.user, this.newEmail?.value).then(() => {
              this.email = this.newEmail?.value;
              this.successEmailMessage = 'E-mail успішно зміненно';
              this.emailChangeActive = !this.emailChangeActive;
            }).catch((e) => {
              console.log(e.code);
              this.errorEmailOccured = true;
              this.errorCode = e.code;
              if (this.errorCode == 'auth/email-already-in-use') {
                this.changeEmailMessage = 'Користувач із таким E-mail уже існує'
              } else if (this.errorCode == 'auth/invalid-email') {
                this.changeEmailMessage = 'E-mail некоректний або неіснуючий'
              } else {
                this.changeEmailMessage = 'Невідома помилка. Будь ласка, повторіть спробу пізніше'
              };
            });
          }
        }).catch((e) => {
          console.log(e.code);
          this.errorEmailOccured = true;
          this.errorCode = e.code;
          if (this.errorCode == 'auth/wrong-password') {
            this.changeEmailMessage = 'Ви ввели неправильний пароль.'
          } else {
            this.changeEmailMessage = 'Невідома помилка. Будь ласка, повторіть спробу входу пізніше (Помилка реавторизації)'
          }
        })
      }
    } else {
      this.errorEmailOccured = true;
      this.changeEmailMessage = 'Введені E-mail адреси не співпадають'
    }
  }

  emailFormButton() {
    this.emailChangeActive = !this.emailChangeActive;
    this.changeEmailMessage = ''
    this.successEmailMessage = '';
  }

  changeDisplayName() {
    console.log('Name change button clicked');
    this.errorNameOccured = false;
    this.changeNameMessage = '';
    this.successNameMessage = '';
    if (this.user) {
      updateProfile(this.user, { displayName: this.newDisplayName?.value }).then(() => {
        this.displayName = this.newDisplayName?.value;
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
