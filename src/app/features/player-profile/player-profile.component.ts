import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CharactersService } from 'src/app/core/services/shared/characters.service';
import { Char } from 'src/app/core/interfaces/char';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, updateEmail, updatePassword, getAuth, reauthenticateWithCredential, EmailAuthProvider } from '@angular/fire/auth';
import { user } from 'rxfire/auth';
import { updateProfile } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { child, getDatabase, ref as refD, set, get } from 'firebase/database';
import { observable } from 'rxjs';
import { storage } from 'firebase-admin';
import { KeyValue } from '@angular/common';





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
    public dashboardComponent: DashboardComponent,

  ) { }


  //Отримуєм користувача з файрбейса
  user = getAuth().currentUser;


  newUserPassword: string;
  newUserEmail: string;
  //Початкові данні користувача
  displayName = getAuth().currentUser?.displayName;
  email = getAuth().currentUser?.email;
  userID = getAuth().currentUser?.uid
  //Отримуємо доступ до "складу" із фотографіями
  storage = getStorage();

  photoName = this.email + '_avatar';

  photoPath = '';
  storageRef = ref(this.storage, 'avatars/' + this.photoName);




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

  passMenuText: string = 'Меню зміни паролю';






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

    this.loadAvatar();
    this.getCharactersFromDB();

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
    if (this.passwordChangeActive) {
      this.passMenuText = 'Приховати'
    } else {
      this.passMenuText = 'Меню зміни паролю'
    }
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

  loadAvatar() {
    getDownloadURL(ref(this.storage, 'avatars/' + this.photoName)).then((url) => {
      this.photoPath = url;
    }).catch((e) => {
      if (e) {
        this.photoPath = '../../../assets/default-profile-avatar.png'
      }
    })
  }

  uploadFile() {
    const file = (document.getElementById('avatar') as any).files[0];
    uploadBytes(this.storageRef, file).then(() => this.loadAvatar());

  }


  db = getDatabase();
  dbRef = refD(getDatabase());

  characters: { [name in string]: Char };


  selectedCharacterName: string;
  getCharactersFromDB() {
    get(child(this.dbRef, 'users/' + this.userID + '/characters')).then((snapshot) => {
      if (snapshot.exists()) {

        this.characters = snapshot.val()

        console.log(snapshot.val())

      }
      else {
        console.log('no data')

      }

    }).catch((e) => {
      console.error(e)
    })

  }




  writeUserData() {
    const db = getDatabase();

    set(refD(db, 'users/' + this.userID), {
      email: this.email,
      username: this.displayName,
      characters: {
        Mishok: {

          str: 10,
          dex: 10,
          con: 11,
          int: 12,
          wis: 13,
          cha: 14,

          acro: 12,
          athl: 10,
          magi: 11,
          dece: 11,
          hist: 11,
          perc: 11,
          inti: 11,
          inve: 11,
          medi: 12,
          natu: 13,
          perc1: 13,
          perf: 12,
          conv: 11,
          reli: 10,
          lege: 14,
          secr: 11,
          surv: 122,
          pett: 12,

          inventory: 'Мішок',
          abilities: 'Корішок',
          health: 20,
          armour: 14
        },
        Vitolik: {
          str: 12,
          dex: 102,
          con: 112,
          int: 122,
          wis: 132,
          cha: 142,

          acro: 121,
          athl: 101,
          magi: 111,
          dece: 111,
          hist: 111,
          perc: 111,
          inti: 111,
          inve: 111,
          medi: 121,
          natu: 131,
          perc1: 113,
          perf: 121,
          conv: 111,
          reli: 101,
          lege: 141,
          secr: 111,
          surv: 12,
          pett: 122,

          inventory: 'Вітолік',
          abilities: 'Бухать',
          health: 20,
          armour: 14
        }
      }
    });
    this.getCharactersFromDB();
  }


}
