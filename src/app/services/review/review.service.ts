import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Review } from '../../models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

    private urlReview = environment.apiUrl + '8083/reviews/ReviewServlet'

    constructor(private http: HttpClient) {}

	filterByPrestador(idPrestador: number): Observable<any> {
		return this.http.get(`${this.urlReview}?idPrestador=${idPrestador}`);
	}

	create(review: Review): Observable<any> {
		return this.http.post(this.urlReview, {
			idCliente: review.idCliente,
			comentario: review.comentario,
			calificacion: review.calificacion,
			idPrestador: review.idPrestador,
			fecha: review.fecha
		});
	}

	delete(idReview: number): Observable<any> {
		return this.http.delete(`${this.urlReview}?idReview=${idReview}`);
	}

	update(review: Review): Observable<any> {
		return this.http.put(this.urlReview, {
			id: review.id,
			comentario: review.comentario,
			calificacion: review.calificacion,
		});
	}
}
