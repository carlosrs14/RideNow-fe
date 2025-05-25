import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Usuario } from '../../models/usuario';
import { TemplateLiteral } from '@angular/compiler';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
	email: string = '';
	password: string = '';
	
	constructor(private userService: UserService, private router:Router) {}

	login() {
		this.userService.login(this.email, this.password).subscribe(response => {
			console.log("Éxito:", response);
			localStorage.setItem('idUsuario', response.id);
			localStorage.setItem('nombreUsuario', response.nombre);
			localStorage.setItem('apellidoUsuario', response.apellido);
			localStorage.setItem('tipoUsuario', response.tipo);
			localStorage.setItem('correoUsuario', response.correo);
			localStorage.setItem('fechaNacimientoUsuario', response.fechaNacimiento);
			localStorage.setItem('telefonoUsuario', response.telefono);
			switch (localStorage.getItem('tipoUsuario')) {
				case 'cliente':
					this.router.navigate(['/viajes']);
					break;
				case 'prestadordeservicio':
					this.router.navigate(['/user']);
					break;
				default:
					this.router.navigate(['/viajes']);
			}
			
		}, error => {
			console.log(error);
		});
	}
}
