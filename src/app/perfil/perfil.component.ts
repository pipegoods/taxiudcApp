import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../shared/services/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  banderaEditTel: boolean;
  user: User = {
    displayName : '',
    uid: '',
    phoneNumber: '',
    photoURL: '',
    email: '',
    emailVerified: false
  };
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.banderaEditTel = false;
    this.user.displayName = this.authService.userData.displayName;
    this.user.uid = this.authService.userData.uid;
    this.user.photoURL = this.authService.userData.photoURL;
    this.user.emailVerified = this.authService.userData.emailVerified;
    this.user.phoneNumber = this.authService.userData.phoneNumber;
    this.user.email = this.authService.userData.email;
    console.log(this.authService.userData.displayName);
    
  }

  guardar() {
    this.banderaEditTel = false;
    console.log(this.user);
    this.authService.SetUserData(this.user);
  }
}
