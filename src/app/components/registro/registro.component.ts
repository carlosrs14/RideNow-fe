import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user/user.service';
import { Usuario } from '../../models/usuario';

@Component({
	selector: 'app-registro',
	imports: [FormsModule, RouterModule],
	standalone: true,
	templateUrl: './registro.component.html',
	styleUrl: './registro.component.css'
})
export class RegistroComponent {
	nombre = '';
	apellido = '';
	correo = '';
	telefono = '';
	fechaNacimiento = new Date();
	tipoUsuario = '';
	password = '';
	passwordConfirm = '';
	passwordMismatch = false;
	constructor(private router: Router, private usuarioService: UserService) {}

	checkPasswordMatch() {
		this.passwordMismatch = this.password !== this.passwordConfirm;
	}

	register() {
		if (this.passwordMismatch) {
			alert("Passwords Not match");
			return;
		}
		const user: Usuario = new Usuario(0, this.nombre, this.apellido, this.tipoUsuario, this.correo, this.fechaNacimiento, this.telefono, this.password)
		this.usuarioService.create(user).subscribe({
			next: (res) => {
				alert('Registro exitoso');
				this.router.navigate(['/viajes']);
			},
			error: (err) => {
				alert('Error al registrarse: ')
			}
		});
	}
}


