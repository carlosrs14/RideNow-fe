import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { NgFor, NgIf } from '@angular/common';
import { routes } from '../../app.routes';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-user',
	imports: [NgIf, RouterLink, FormsModule],
	templateUrl: './user.component.html',
	styleUrl: './user.component.css'
})
export class UserComponent {
	id: number = 0;
	nombre: string = '';
	apellido: string = '';
	email: string = '';
	telefono: string = '';
	tipo: string = '';
	password: string = '';
	fechaNacimiento: Date = new Date();

	modoEdicion: boolean = false;
	nombreOriginal: string = '';
	apellidoOriginal: string = '';
	telefonoOriginal: string = '';
	emailOriginal: string = ''
	passwordOriginal: string = '';
	constructor(private route: Router, private userService: UserService) {}

	ngOnInit(): void {
		const id = localStorage.getItem("idUsuario");
		if (id) {
			this.id = parseInt(id);
		}

		const nombre = localStorage.getItem("nombreUsuario");
		if (nombre) {
			this.nombre = nombre;
		}
		
		const apellido = localStorage.getItem("apellidoUsuario");
		if (apellido) {
			this.apellido = apellido;
		}
		
		const email = localStorage.getItem("correoUsuario");
		if (email) {
			this.email = email;
		}
		
		const telefono = localStorage.getItem("telefonoUsuario");
		if (telefono) {
			this.telefono = telefono;
		}
		
		const tipo = localStorage.getItem("tipoUsuario");
		if (tipo) {
			this.tipo = tipo;
		}

		const fechaNacimiento = localStorage.getItem("fechaNacimientoUsuario");
		if (fechaNacimiento) {
			this.fechaNacimiento = new Date(fechaNacimiento);
		}

		const password = localStorage.getItem("passwordUsuario");
		if (password) {
			this.password = password;
		}
	}
	
	borrarCuenta() {
		Swal.fire({
			title: "¿Estás seguro?",
			text: "¡Esta acción no se puede deshacer!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar"
		}).then((result) => {
			if(result.isConfirmed) {
				this.userService.delete(this.id).subscribe({
				next: (response) => {
					localStorage.clear();
					this.route.navigate(["/registro"]);
					alert("Usuario borrado exitósamente");
				},
				error: (error) => {
					alert("Usuario no borrado");
				}
			});
			}
		});
	
	}

	cerrarSesion() {
		localStorage.clear();
		this.route.navigate(["/login"]);
	}

	editarCuenta() {
		this.modoEdicion = true;
		this.nombreOriginal = this.nombre;
		this.apellidoOriginal = this.apellido;
		this.telefonoOriginal = this.telefono;
		this.emailOriginal = this.email;
	}

	guardarCambios() {
    const fechaFormateada = this.fechaNacimiento.toISOString().split("T")[0];
    this.userService.update(
        new Usuario(this.id, this.nombre, this.apellido, this.tipo, this.email, new Date(fechaFormateada), this.telefono, this.password)
    ).subscribe({
        next: (response) => {
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado',
                showConfirmButton: false,
                timer: 1500
            });
            this.modoEdicion = false;
        },
        error: (error) => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error actualizando el usuario'
            });
            this.modoEdicion = false;
        }
    });
}

	cancelarEdicion() {
		this.nombre = this.nombreOriginal;
		this.apellido = this.apellidoOriginal;
		this.telefono = this.telefonoOriginal;
		this.email = this.emailOriginal;
		this.modoEdicion = false;
	}
}
