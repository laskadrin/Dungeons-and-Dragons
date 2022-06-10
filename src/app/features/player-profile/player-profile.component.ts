import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CharactersService } from 'src/app/core/services/shared/characters.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, updateEmail, updatePassword, getAuth, reauthenticateWithCredential } from '@angular/fire/auth';
import { user } from 'rxfire/auth';
@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  @Output() formData: EventEmitter<{
    email: string;
    password: string;
  }> = new EventEmitter();

  form: FormGroup;


  constructor(

    private fb: FormBuilder,
    public dashboardComponent: DashboardComponent
  ) { }




  user = getAuth().currentUser;
  newUserPassword: string;

  displayName = getAuth().currentUser?.displayName;
  email = getAuth().currentUser?.email;
  passwordChangeActive: boolean = false;
  errorCode: string = '';
  changeMessage: string = '';
  successMessage: string = ' '
  errorOccured: boolean = false;
  ngOnInit(): void {
    this.form = this.fb.group({

      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', Validators.required]
    });
  }


  get newPassword() {
    return this.form.get('newPassword')
  }
  get newPasswordConfirm() {
    return this.form.get('newPasswordConfirm')
  }

  onSubmit() {
    if (this.form.valid) {
      this.formData.emit(this.form.value)
      this.changePassword();
    }

  }

  changePassword() {
    console.log('Password change button clicked');
    this.errorOccured = false;
    this.changeMessage = '';
    this.newUserPassword = this.newPassword?.value;
    if (this.newPassword?.value == this.newPasswordConfirm?.value) {
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
    } else {
      this.errorOccured = true;
      this.changeMessage = 'Паролі не співпадають'
    }

  }
  passwordFormButton() {
    this.passwordChangeActive = true;
  }
}
