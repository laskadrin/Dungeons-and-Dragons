import { Component, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadAvatar();
  }

  email = getAuth().currentUser?.email;

  photoPath = '';
  photoName = this.email + '_avatar';

  storage = getStorage();
  storageRef = ref(this.storage, 'avatars/' + this.photoName);


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
}
