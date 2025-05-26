import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Denuncia} from '../../models/Denuncia';
import { DenunciaService } from '../../services/denuncias/denuncia.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.css'
})
export class DenunciasComponent {
  constructor(private servicio: DenunciaService, private roter: Router){}
  denuncias: Denuncia[] = [];
  denunciaSelected: Denuncia = new Denuncia(0, "", "", "", 0, 0);
  newDenuncia: Denuncia = new Denuncia(0, "", "", "", 0, 0);
  nombre: string = "";
  correo: string = "";

  descripcionAnterior: string = "";

  isEditing: boolean = false;
  isAdding: boolean = false;

    ngOnInit(): void {
    const nombreCache = localStorage.getItem("nombreUsuario");
    const correoCache = localStorage.getItem("correoUsuario")
    const idClienteStr = localStorage.getItem('idUsuario'); 
    if (!nombreCache || !idClienteStr || !correoCache) {
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
    
    const idCliente = parseInt(idClienteStr);
    this.servicio.filterByOwner(idCliente).subscribe({
      next: (response) => {
        for (let denuncia of response) {
          this.denuncias.push(
            new Denuncia(
              denuncia.id,
              denuncia.fecha,
              denuncia.descripcion,
              denuncia.estado,
              denuncia.idCliente,
              denuncia.idPrestadorDeServicio,
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


    editDenuncia(denuncia: Denuncia) {
      this.denunciaSelected = denuncia;
      this.descripcionAnterior = denuncia.descripcion;
      this.abrirModalEditing();
    }

    cerrarModalEditing() {
		  this.isEditing = false;
	  }

    cancelarCambios() {
      this.denunciaSelected.descripcion = this.descripcionAnterior;
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

  
    guardarNuevo() {
      const idCliente1 = localStorage.getItem('idUsuario');
      if(!idCliente1) return;
      this.newDenuncia.idCliente = parseInt(idCliente1);
      

        console.log("Enviando denuncia:", this.newDenuncia); 
      this.servicio.create(this.newDenuncia).subscribe({
        next: (response) => {
            Swal.fire({
            title: "Denuncia creada correctamente",
            icon: "success",
            draggable: true
          });
          location.reload();
        },
        error: (err) => {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error al guardar la denuncia",
          });
        }
      });
      this.cerrarModalAdding();
    }

    deleteDenuncia(idDenuncia: number) {
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
              this.servicio.delete(idDenuncia).subscribe({
                next: () => {
                    Swal.fire("Eliminado", "La denuncia ha sido eliminada correctamente.", "success").then(() => {
                      location.reload(); 
                  });
                },
                error: () => {
                    Swal.fire("Error", "No se pudo eliminar la denuncia", "error");
                }
            });
          }
        });
    }

    guardarCambios() {
      if (!this.denunciaSelected) {
        this.cerrarModalEditing();
        return;
      }
      this.servicio.update(this.denunciaSelected).subscribe({
        next: (response) => {
            Swal.fire({
            title: "Denuncia modificada correctamente",
            icon: "success",
            draggable: true
          });
        },
        error: (error) => {
          this.denunciaSelected.descripcion = this.descripcionAnterior;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se ha podido modificarla denuncia",
          });
        }
      });
      this.cerrarModalEditing();
      }





}
