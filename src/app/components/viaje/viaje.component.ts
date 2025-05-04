import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ViajeService } from '../../services/viaje/viaje.service';
@Component({
  selector: 'app-viaje',
  imports: [FormsModule, NgFor],
  standalone: true,
  templateUrl: './viaje.component.html',
  styleUrl: './viaje.component.css'
})
export class ViajeComponent {
  origen = ''
  destino = ''
  viajes: any[] = [];

  constructor(private viajeService: ViajeService) {}

  ngOnInit(): void {
    this.viajeService.listarViajes().subscribe({
      next: (data) => {
        if (data.resultado === 'hecho' && Array.isArray(data.viajes)) {
          this.viajes = data.viajes;
        } else {
          console.warn('No se encontraron viajes o el formato es incorrecto');
        }
      },
      error: (err) => {
        console.error('Error al cargar los viajes:', err);
      }
    });
  }
}
