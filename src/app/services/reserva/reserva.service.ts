import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../../models/reserva';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  	providedIn: 'root'
})
export class ReservaService {

	private urlReserva = environment.apiUrl +'microservicio_reserva_RN/ReservaServlet'
	
  	constructor(private http: HttpClient) { }

	filterByOwner(idOwner: number): Observable<any> {
		return this.http.get(`${this.urlReserva}?idowner=${idOwner}`);
	}

	create(reserva: Reserva): Observable<any> {
		return this.http.post(this.urlReserva, {
			idCliente: reserva.idCliente,
			fecha: reserva.fecha,
			idViaje: reserva.idViaje
		});
	}

	delete(idReserva: number): Observable<any> {
		return this.http.delete(`${this.urlReserva}?idReserva=${idReserva}`);
	}
}
