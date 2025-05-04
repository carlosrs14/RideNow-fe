import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  review = {
    comentario: '',
    calificacion: null
  };
  enviarReview() {

  }

}
