import { Component, NgZone } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taxiudc';

  constructor (public authService: AuthService,
    public router: Router,  
    public ngZone: NgZone) {

  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      });
    } else {
      this.ngZone.run(() => {
        this.router.navigate(['login']);
      });
    }
    
  }
}
