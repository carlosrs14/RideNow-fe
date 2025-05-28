import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { ViajesComponent } from './components/viajes/viajes.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ReviewComponent } from './components/review/review.component';
import { UserComponent } from './components/user/user.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { DenunciasComponent } from './components/denuncias/denuncias.component';
import { MisviajesComponent } from './components/misviajes/misviajes.component';
import { MasinformacionComponent } from './components/masinformacion/masinformacion.component';

export const routes: Routes = [
    {path: 'viajes', component: ViajesComponent, canActivate: []},
    {path: 'login', component: LoginComponent, canActivate: []},
    {path: 'registro', component: RegistroComponent, canActivate: []},
    {path: 'reserva', component: ReservaComponent, canActivate: []},
    {path: 'review', component: ReviewComponent, canActivate: []},
    {path: 'user', component: UserComponent, canActivate: []},
    {path: 'vehiculos', component: VehiculosComponent, canActivate: []},
    {path: 'denuncias', component: DenunciasComponent, canActivate: []},
    {path: 'misviajes', component: MisviajesComponent, canActivate: []},
    {path: 'masinfo', component: MasinformacionComponent, canActivate: []},
    {path: '**', redirectTo: '/viajes', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
