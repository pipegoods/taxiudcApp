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
    emailVerified: false,
    barriosI: []
  };
  barrioA = '';
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.banderaEditTel = false;
    this.user.displayName = this.authService.userData.displayName;
    this.user.uid = this.authService.userData.uid;
    this.user.photoURL = this.authService.userData.photoURL;
    this.user.emailVerified = this.authService.userData.emailVerified;
    this.user.phoneNumber = this.authService.userData.phoneNumber;
    this.user.email = this.authService.userData.email;
    this.user.barriosI = this.authService.userData.barriosI;
    console.log(this.authService.userData.barriosI);
    
  }

  guardar() {
    this.banderaEditTel = false;
    console.log(this.user);
    this.authService.SetUserData(this.user);
  }

  agregarBarrio () {
    if (this.barrioA != '') {
      this.user.barriosI.push(this.barrioA);
      this.authService.SetUserData(this.user);
      this.barrioA = '';
    } else {
      alert("No has ingresado un barrio.");
    }
  }
}
