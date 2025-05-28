import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Review } from '../../models/Review';

@Component({
  selector: 'app-masinformacion',
  imports: [NgFor],
  templateUrl: './masinformacion.component.html',
  styleUrl: './masinformacion.component.css'
})
export class MasinformacionComponent {
  nombre: string = "";
  correo: string = "";
  reviews: Review[] = [];

}
