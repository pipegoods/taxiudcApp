import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TaxiService } from '../ser/taxi.service';
import { Taxi } from '../taxi.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  taxis: Taxi[];
  constructor(public authService: AuthService,
    protected taxisS: TaxiService,
    private toastr: ToastrService) { }

    ngOnInit() {
      
      this.taxisS.getTaxis().subscribe(data => {
        this.toastr.info("¡Nuevo Taxi!");
        
        this.taxis = data.map(e => {
          console.log(e.payload.doc.id);
          
          return {
            idu: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Taxi;
        });
        console.log(this.taxis);
        
      });
      
      
    }

    delete(id: string) {
      console.log(id);
      
      var r = confirm("¿Estas seguro de eliminar?");
if (r == true) {
  this.taxisS.deleteTaxis(id);
} 
      
    }
}
