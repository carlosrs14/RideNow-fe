import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { ViajeComponent } from './components/viaje/viaje.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ReviewComponent } from './components/review/review.component';
export const routes: Routes = [
    {path: '', redirectTo: '/viaje',pathMatch: 'full'},
    {path: 'viaje', component: ViajeComponent, canActivate: []},
    {path: 'login', component: LoginComponent, canActivate: []},
    {path: 'registro', component: RegistroComponent, canActivate: []},
    {path: 'reserva', component: ReservaComponent, canActivate: []},
    {path: 'review', component: ReviewComponent, canActivate: []},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
