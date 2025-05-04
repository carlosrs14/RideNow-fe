import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-reserva',
  imports: [FormsModule, NgFor],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
  reservas: any[] = [];

  borrar(reserva:string): void {
    
  }
  
  editar(reserva:string) {
    
  }
}
