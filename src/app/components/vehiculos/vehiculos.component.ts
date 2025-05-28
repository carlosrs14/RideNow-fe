import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoService } from '../../services/vehiculo/vehiculo.service';
import { Router } from '@angular/router';
import { Viaje } from '../../models/Viaje';
import Swal from 'sweetalert2';
import { ViajeService } from '../../services/viaje/viaje.service';
@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent {
  constructor( private servicio: VehiculoService, private servicioViaje: ViajeService,  private router: Router){}
  vehiculos: Vehiculo[] = [];
  vehiculoSelected: Vehiculo = new Vehiculo(0, "", 0, "", false, "", 0, 0);
  newVehiculo: Vehiculo = new Vehiculo(0, "", 0, "", false, "", 0, 0);
  newViaje: Viaje = new Viaje(0, new Date(), 0,"", 0, 0, 0, 0);
  nombre: string = "";
  correo: string = "";

  marcaAnterior: string = "";
  tieneAireAnterior: boolean = false;
  modeloAnterior: number = 0;
  colorAnterior: string = "";
  capacidadAnterior: number = 0;

  vehiculoParaViaje: any = null;

  isEditing: boolean = false;
  isAdding: boolean = false;
  AddingViaje: boolean = false;

    ngOnInit(): void {
    const nombreCache = localStorage.getItem("nombreUsuario");
    const correoCache = localStorage.getItem("correoUsuario")
    const idPrestadorStr = localStorage.getItem('idUsuario'); 
    if (!nombreCache || !idPrestadorStr || !correoCache) {
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

    const idPrestador = parseInt(idPrestadorStr);
    this.servicio.filterByOwner(idPrestador).subscribe({
      next: (response) => {
        for (let vehiculo of response) {
          this.vehiculos.push(
            new Vehiculo(
              vehiculo.id,
              vehiculo.marca,
              vehiculo.modelo,
              vehiculo.placa,
              vehiculo.tieneAire,
              vehiculo.color,
              vehiculo.capacidad,
              vehiculo.idPrestadorDeServicio
            )
          );
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al cargar los vehículos",
        });
      }
    });
    }

    editVehiculo(vehiculo: Vehiculo) {
      this.vehiculoSelected = vehiculo;
      this.marcaAnterior= vehiculo.marca;
      this.tieneAireAnterior = vehiculo.tieneAire;
      this.modeloAnterior = vehiculo.modelo;
      this.colorAnterior = vehiculo.color;
      this.capacidadAnterior = vehiculo.capacidad;
      this.abrirModalEditing();
    }

  cerrarModalEditing() {
		this.isEditing = false;
	}
  
  cancelarCambios() {
   this.vehiculoSelected.marca = this.marcaAnterior;
   this.vehiculoSelected.tieneAire = this.tieneAireAnterior;
   this.vehiculoSelected.modelo = this.modeloAnterior;
   this.vehiculoSelected.color = this.colorAnterior;
   this.vehiculoSelected.capacidad = this.capacidadAnterior;
   this.cerrarModalEditing();
  }
  
  
	abrirModalEditing() {
		this.isEditing = true;
	}

  cerrarModalAdding() {
		this.isAdding = false;
	}

  abrirModalAdding() {
		this.isAdding = true;
	}

  abrirModalAddingViaje(vehiculo: Vehiculo) {
    this.vehiculoParaViaje = vehiculo;
    this.AddingViaje = true;
  }
  
  cerrarModalAddingViaje() {
    this.AddingViaje = false;
    this.vehiculoParaViaje = null;
  }

  agregarViaje(vehiculo: Vehiculo) {
    this.vehiculoParaViaje = vehiculo;
    this.AddingViaje = true;

    this.newViaje = {
      id:0, 
      fecha: new Date(),
      hora: 0,
      tipo: "",
      precio: 0,
      idVehiculo: vehiculo.id,
      idLocacionOrigen: 0,
      idLocacionDestino: 0
    };

  }
guardarViaje() {
  this.servicioViaje.create(this.newViaje).subscribe({
    next: (response) => {
      Swal.fire({
        title: "Viaje creado correctamente",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        this.cerrarModalAdding(); 
        location.reload(); 
      });
    },
    error: (err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al guardar el viaje",
      });
    }
  });
}


  guardarNuevo() {
    const idPrestador = localStorage.getItem('idUsuario');
    if(!idPrestador) return;
    this.newVehiculo.idPrestadorDeServicio = parseInt(idPrestador);

    this.servicio.create(this.newVehiculo).subscribe({
      next: (response) => {
        	Swal.fire({
					title: "Vehículo creado correctamente",
					icon: "success",
					draggable: true
				});
				location.reload();
      },
      error: (err) => {
        	Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Hubo un error al guardar el vehículo",
				});
      }
    });
    this.cerrarModalAdding();
  }

  deleteVehiculo(idVehiculo: number) {
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
      			this.servicio.delete(idVehiculo).subscribe({
        			next: () => {
          				Swal.fire("Eliminado", "El vehículo ha sido eliminada correctamente.", "success").then(() => {
            				location.reload(); 
         				});
       				},
        			error: () => {
          				Swal.fire("Error", "No se pudo eliminar el vehículo", "error");
        			}
     	 		});
    		}
  		});
	}

 guardarCambios() {
    if (!this.vehiculoSelected) {
      this.cerrarModalEditing();
      return;
    }
    this.servicio.update(this.vehiculoSelected).subscribe({
      next: (response) => {
        	Swal.fire({
					title: "Vehículo modificado correctamente",
					icon: "success",
					draggable: true
				});
      },
      error: (error) => {
        this.vehiculoSelected.marca = this.marcaAnterior;
        this.vehiculoSelected.tieneAire = this.tieneAireAnterior;
        this.vehiculoSelected.modelo = this.modeloAnterior;
        this.vehiculoSelected.color = this.colorAnterior;
        this.vehiculoSelected.capacidad = this.capacidadAnterior;
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "No se ha podido modificar el vehículo",
				});
      }
    });
    this.cerrarModalEditing();
    }
}

