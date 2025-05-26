import { Component } from '@angular/core';
import { Viaje } from '../../models/viaje';
import { NgFor } from '@angular/common';
import { ViajeService } from '../../services/viaje/viaje.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
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


  isAdding: boolean = false;
  ngOnInit(): void {

  }
 
}
