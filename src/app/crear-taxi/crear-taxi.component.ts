import { Component, OnInit } from '@angular/core';
import { Taxi } from '../taxi.model';
import { AuthService } from '../auth.service';
import { TaxiService } from '../ser/taxi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-taxi',
  templateUrl: './crear-taxi.component.html',
  styleUrls: ['./crear-taxi.component.css']
})
export class CrearTaxiComponent implements OnInit {
  taxi: Taxi;

  constructor(public authService: AuthService,
    protected taxisS: TaxiService,
    private router: Router) { }

  ngOnInit() {
    this.taxi = {
      id: "",
      idP: this.authService.userData.uid,
      nombre: this.authService.userData.displayName,
      barrio: "",
      fecha: Date.now(),
      wpp: this.authService.userData.phoneNumber
    };
    console.log(this.taxi);
    
  }

  crearTaxi() {
    this.taxisS.postTaxis(this.taxi).then(e => {
      
    });
    this.router.navigate(['/home'])

  }

}
