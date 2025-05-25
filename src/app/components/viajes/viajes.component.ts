import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ViajeService } from '../../services/viaje/viaje.service';
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
	viajes: any[] = [];

	constructor(private viajeService: ViajeService) {}

	ngOnInit(): void {
		this.viajeService.all().subscribe({
			next: (data) => {
				for (let viaje of data) {
					this.viajes.push({id: viaje.id, fecha: viaje.id, hora: viaje.hora, precio: viaje.precio, tipo: viaje.tipo});
				}
			},
			error: (err) => {
				console.error('Error al cargar los viajes:', err);
			}
		});
	}
}
