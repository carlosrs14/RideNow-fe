import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { ViajesComponent } from './components/viajes/viajes.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ReviewComponent } from './components/review/review.component';
import { UserComponent } from './components/user/user.component';
export const routes: Routes = [
    {path: '', redirectTo: '/viajes', pathMatch: 'full'},
    {path: 'viajes', component: ViajesComponent, canActivate: []},
    {path: 'login', component: LoginComponent, canActivate: []},
    {path: 'registro', component: RegistroComponent, canActivate: []},
    {path: 'reserva', component: ReservaComponent, canActivate: []},
    {path: 'review', component: ReviewComponent, canActivate: []},
    {path: 'user', component: UserComponent, canActivate: []},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
