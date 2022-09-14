import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { updatePassword, getAuth, reauthenticateWithCredential, EmailAuthProvider } from '@angular/fire/auth';
@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.css']
})
export class PasswordEditComponent implements OnInit {

  @Output() formData: EventEmitter<{
    password: string;
  }> = new EventEmitter();
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder,) { }

  user = getAuth().currentUser;
  email = getAuth().currentUser?.email;
  newUserPassword: string;

  passwordChangeActive: boolean = false;

  errorCode: string = '';

  changeMessage: string = '';
  successMessage: string = ' ';
  errorOccured: boolean = false;

  passMenuText: string = 'Меню зміни паролю';

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', Validators.required]
    });
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

  onSubmitPassword() {
    if (this.passwordForm.valid && this.passwordChangeActive) {
      this.formData.emit(this.passwordForm.value);
      this.changePassword();
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
    if (this.passwordChangeActive) {
      this.passMenuText = 'Приховати'
    } else {
      this.passMenuText = 'Меню зміни паролю'
    }
    this.changeMessage = ''
  }
}
