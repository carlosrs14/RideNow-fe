import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ViajeService } from '../../services/viaje/viaje.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Viaje } from '../../models/viaje';

@Component({
  selector: 'app-misviajes',
  imports: [FormsModule, NgFor],
  templateUrl: './misviajes.component.html',
  styleUrl: './misviajes.component.css'
})
export class MisviajesComponent {
  constructor(private servicio: ViajeService, private router: Router){}
  nombre: string = "";
  correo: string = "";
  viajes: Viaje[] = [];

  ngOnInit(): void {
    const nombreCache = localStorage.getItem("nombreUsuario");
    const correoCache = localStorage.getItem("correoUsuario");
    const idPrestadorDeServicioStr = localStorage.getItem('idUsuario');
    if (!nombreCache || !idPrestadorDeServicioStr || !correoCache) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes logearte",
      });
      return;
    } else {
      this.nombre = nombreCache.toString();
      this.correo = correoCache.toString();
    }
    const idPrestadorDeServicio = parseInt(idPrestadorDeServicioStr);
    this.servicio.filterByOwner(idPrestadorDeServicio).subscribe({
      next: (response) => {
        for (let viaje of response) {
          this.viajes.push(
            new Viaje(
              viaje.id,
              viaje.fecha,
              viaje.hora,
              viaje.tipo,
              viaje.precio,
              viaje.idVehiculo,
              viaje.idLocacionOrigen,
              viaje.idLocacionDestino,
            )
          );
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al cargar las denuncias",
        });
      }
    });
    }

    deleteViaje(idViaje: number) {
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
            this.servicio.delete(idViaje).subscribe({
              next: () => {
                  Swal.fire("Eliminado", "El viaje ha sido eliminado correctamente.", "success").then(() => {
                    location.reload(); 
                });
              },
              error: () => {
                  Swal.fire("Error", "No se pudo eliminar el viaje", "error");
              }
          });
        }
      });

    }
  }
 
