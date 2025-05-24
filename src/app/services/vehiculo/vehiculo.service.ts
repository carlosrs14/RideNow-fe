import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../../models/vehiculo';
import { environment } from '../../../environments/environment';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';

@Injectable({
    providedIn: 'root'
})
export class VehiculoService {
	
	private urlVehiculo = environment.apiUrl + 'microservicio_viajes_RN/VehiculoServlet';
	
	constructor(private http: HttpClient) { }

	create(vehiculo: Vehiculo): Observable<any> {
		return this.http.post(this.urlVehiculo, {
			marca: vehiculo.marca,
			modelo: vehiculo.modelo,
			placa: vehiculo.placa,
			tienAire: vehiculo.tieneAire,
			color: vehiculo.color,
			capacidad: vehiculo.capacidad,
			idPrestadorDeServicio: vehiculo.idPrestadorDeServicio
		});
	}

	all(): Observable<any> {
		return this.http.get(this.urlVehiculo);
	}
	
	filterByOwner(idPrestadorDeServicio: number): Observable<any> {
		return this.http.get(this.urlVehiculo + `?idPrestadorDeServicio=${idPrestadorDeServicio}`);
	}

	update(vehiculo: Vehiculo): Observable<any> {
		return this.http.put(this.urlVehiculo, {
			id: vehiculo.id,
			marca: vehiculo.marca,
			modelo: vehiculo.modelo,
			placa: vehiculo.placa,
			tienAire: vehiculo.tieneAire,
			color: vehiculo.color,
			capacidad: vehiculo.capacidad,
			idPrestadorDeServicio: vehiculo.idPrestadorDeServicio
		});
	}

	delete(vehiculo: Vehiculo): Observable<any> {
		return this.http.delete(this.urlVehiculo + `?id=${vehiculo.id}`);
	}
}
