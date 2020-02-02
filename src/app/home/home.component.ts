import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TaxiService } from '../ser/taxi.service';
import { Taxi } from '../taxi.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  taxis: Taxi[];
  constructor(public authService: AuthService,
    protected taxisS: TaxiService) { }

    ngOnInit() {
      this.taxisS.getTaxis().subscribe(data => {
        this.taxis = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Taxi;
        });
        console.log(this.taxis);
        
      });
      
      
    }

    delete(id: string) {
      var r = confirm("¿Estas seguro de eliminar?");
if (r == true) {
  this.taxisS.deleteTaxis(id);
} 
      
    }
}
