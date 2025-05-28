import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Review } from '../../models/Review';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-masinformacion',
  imports: [NgFor],
  templateUrl: './masinformacion.component.html',
  styleUrl: './masinformacion.component.css'
})
export class MasinformacionComponent {
    usuario: Usuario = new Usuario(0, "", "", "", "", new Date(), "", "");
    reviews: Review[] = [];

	constructor(private servicioUsuario: UserService, private route: ActivatedRoute) {}

	ngOnInit() {
		const idViajeStr = this.route.snapshot.paramMap.get("id");
		if (!idViajeStr) return;
		const idViaje: number = parseInt(idViajeStr);

		this.servicioUsuario.getByIdViaje(idViaje).subscribe({
			next: (response) => {
				this.usuario = new Usuario(
					response.id,
					response.nombre,
					response.apellido,
					response.tipo,
					response.correo,
					response.fechaNacimiento,
					response.telefono,
					""
				)
			},
			error: (error) => {
				console.log(error);
				Swal.fire("Error", "No se pudo obtener la informacion", "error");
			}
		});

	}

}
