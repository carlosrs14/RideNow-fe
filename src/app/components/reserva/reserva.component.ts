import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Reserva } from '../../models/reserva';
import { ReservaService } from '../../services/reserva/reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva',
  imports: [FormsModule, NgFor],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
    reservas: Reserva[] = [];

	constructor(private servicioReserva: ReservaService, private router: Router) {}

	ngOnInit() {
		this.reservas = [];
		const idOwnerStr = localStorage.getItem('idUsuario');
		if (!idOwnerStr) return;
		const idOwner: number = parseInt(idOwnerStr);		
		this.servicioReserva.filterByOwner(idOwner).subscribe({
			next: (response) => {
				for (let reserva of response) {
					this.reservas.push(new Reserva(reserva.id, reserva.fecha, idOwner, reserva.idPago, reserva.idViaje));
				}
			},
			error: (error) => {
				
				console.log(error);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Hubo un error al reservar el viaje",
				});
			}
		});
	}

    borrar(reserva: Reserva): void {
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
			  if (result.isConfirmed) {
				  this.servicioReserva.delete(reserva.id).subscribe({
					next: () => {
						Swal.fire("Eliminado", "La reserva ha sido eliminada correctamente.", "success").then(() => {
						  location.reload(); 
					  });
					},
					error: (error) => {
						console.log(error);
						Swal.fire("Error", "No se pudo eliminar la reserva", "error");
					}
				});
			  }
			});
    }
    
    masInfo(idViaje: number) {
		this.router.navigate([`/masinfo/${idViaje}`])
	}
}
