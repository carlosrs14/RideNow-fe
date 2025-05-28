import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ViajeService } from '../../services/viaje/viaje.service';
import { Viaje } from '../../models/viaje';
import { ReservaService } from '../../services/reserva/reserva.service';
import { Reserva } from '../../models/reserva';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-viaje',
	imports: [FormsModule, NgFor],
	standalone: true,
	templateUrl: './viajes.component.html',
	styleUrl: './viajes.component.css'
})
export class ViajesComponent {
	origen = ''
	destino = ''
	viajes: Viaje[] = [];

	constructor(private viajeService: ViajeService, private reservaService: ReservaService, private router: Router) {}

	ngOnInit(): void {
		this.viajeService.all().subscribe({
			next: (data) => {
				for (let viaje of data) {
					this.viajes.push(
						new Viaje(viaje.id,
							viaje.fecha,
							viaje.hora,
							viaje.tipo,
							viaje.precio,
							viaje.idVehiculo,
							viaje.idLocacionOrigen,
							viaje.idLocacionDestino
						)
					);
				}
			},
			error: (err) => {
				console.error('Error al cargar los viajes:', err);
			}
		});
	}

	reservar(viaje: Viaje) {
		const idUsuarioStr = localStorage.getItem('idUsuario');
		if (!idUsuarioStr) return;
		const idUsuario: number = parseInt(idUsuarioStr);
		this.reservaService.create(new Reserva(0, new Date(), idUsuario, 0, viaje.id)).subscribe({
			next: (response) => {
				Swal.fire({
					title: "Reserva creada correctamente",
					icon: "success",
					confirmButtonText: "OK"
				});
			},
			error: (err) => {
				console.log(err);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Hubo un error al reservar el viaje",
				});
			}
		});
	}

	informacion(viaje: Viaje) {
		this.router.navigate([`/masinfo/${viaje.idVehiculo}`]);
	}
}
