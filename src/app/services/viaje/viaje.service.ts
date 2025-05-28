import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Viaje } from '../../models/viaje';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

    private urlViaje = environment.apiUrl +'microservicio_viajes_RN/ViajeServlet'
	
	constructor(private http: HttpClient) {}

	create(viaje: Viaje): Observable<any> {
		return this.http.post(this.urlViaje, {
			hora: viaje.hora,
			precio: viaje.precio,
			tipo: viaje.tipo,
			fecha: viaje.fecha,
			idLocacionOrigen: viaje.idLocacionOrigen,
			idLocacionDestino: viaje.idLocacionDestino,
			idVehiculo: viaje.idVehiculo
		});
	}

	all(): Observable<any> {
		return this.http.get(this.urlViaje);
	}

	get(idViaje: number): Observable<any> {
		return this.http.get(this.urlViaje + `?id=${idViaje}`);
	}

	delete(idViaje: number): Observable<any> {
		return this.http.delete(this.urlViaje + `?id=${idViaje}`);
	}

	filterByOwner(idPrestadorDeServicio: number): Observable<any> {
		return this.http.get(this.urlViaje + `?idOwner=${idPrestadorDeServicio}`)
	}
}
