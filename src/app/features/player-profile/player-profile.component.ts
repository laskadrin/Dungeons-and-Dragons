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
  form: FormGroup;


  @Output() nameFormData: EventEmitter<{
    name: string
  }> = new EventEmitter();
  nameForm: FormGroup;



  constructor(

    private fb: FormBuilder,
    public dashboardComponent: DashboardComponent
  ) { }




  user = getAuth().currentUser;

  newUserPassword: string;
  oldUserPassword: string;

  displayName = getAuth().currentUser?.displayName;
  email = getAuth().currentUser?.email;

  passwordChangeActive: boolean = false;
  displayNameChangeActive: boolean = false;

  errorCode: string = '';

  changeMessage: string = '';
  successMessage: string = ' ';
  errorOccured: boolean = false;

  changeNameMessage: string = '';
  successNameMessage: string = '';
  errorNameOccured: boolean = false;

  photoPath: string = '../../../assets/default-profile-avatar.png';
  selectedFile: File;

  downloadURL: Observable<string>;


  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', Validators.required]
    });
    this.nameForm = this.fb.group({
      newDisplayName: ['', Validators.required]
    })
  }

  get oldPassword() {
    return this.form.get('oldPassword')
  }
  get newPassword() {
    return this.form.get('newPassword')
  }
  get newPasswordConfirm() {
    return this.form.get('newPasswordConfirm')
  }

  get newDisplayName() {
    return this.nameForm.get('newDisplayName')
  }

  onSubmit() {
    if (this.form.valid) {
      this.formData.emit(this.form.value)
      this.changePassword();
    }
    if (this.nameForm.valid) {
      this.nameFormData.emit(this.nameForm.value)
      this.changeDisplayName();
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
              this.errorCode = e.code;
              if (this.errorCode == 'auth/requires-recent-login') {
                this.errorOccured = true;
                this.changeMessage = 'Для зміни паролю необхідно, щоб вхід був здійснений нещодавно. Пробачте за незручності. Перезайдіть до акаунту та спробуйте знову.'
              } else if (this.errorCode == 'auth/weak-password') {
                this.errorOccured = true;
                this.changeMessage = 'Новий пароль заслабкий. Введіть принаймні 6 символів';
              }
              else {
                this.errorOccured = true;
                this.changeMessage = 'Невідома помилка. Будь ласка, повторіть спробу пізніше';
              };
            });
          }
        }).catch((e) => {
          console.log(e.code);
          this.errorCode = e.code;
          if (this.errorCode == 'auth/wrong-password') {
            this.errorOccured = true;
            this.changeMessage = 'Ваш старий пароль введено неправильно.'
          } else {
            this.errorOccured = true;
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
    this.passwordChangeActive = true;
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
    this.successNameMessage = '';
  }


}
