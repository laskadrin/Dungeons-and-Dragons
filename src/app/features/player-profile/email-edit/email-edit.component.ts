import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { updateEmail, getAuth, reauthenticateWithCredential, EmailAuthProvider } from '@angular/fire/auth';
@Component({
  selector: 'app-email-edit',
  templateUrl: './email-edit.component.html',
  styleUrls: ['./email-edit.component.css']
})
export class EmailEditComponent implements OnInit {

  @Output() emailFormData: EventEmitter<{
    email: string;
    password: string;
  }> = new EventEmitter;
  emailForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  user = getAuth().currentUser;
  email = getAuth().currentUser?.email;
  newUserEmail: string;
  emailChangeActive: boolean = false;
  errorCode: string = '';

  changeEmailMessage: string = '';
  successEmailMessage: string = '';
  errorEmailOccured: boolean = false;


  ngOnInit(): void {
    this.emailForm = this.fb.group({
      newEmail: ['', Validators.required],
      newEmailConfirm: ['', Validators.required],
      newEmailPassword: ['', Validators.required]
    })
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


  onSubmitEmail() {
    if (this.emailForm.valid && this.emailChangeActive) {
      this.emailFormData.emit(this.emailForm.value);
      this.changeEmail();
    }
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
}
