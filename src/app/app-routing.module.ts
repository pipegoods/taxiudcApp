import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { CrearTaxiComponent } from './crear-taxi/crear-taxi.component';


const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'crearTaxi', component: CrearTaxiComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
