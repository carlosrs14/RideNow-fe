import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    private urlLogin = environment.apiUrl +'microservicio_usuario_RN/LoginServlet'
    private urlUsuario = environment.apiUrl +'microservicio_usuario_RN/UsuarioServlet'
    private urlPrestadorDeServicio = environment.apiUrl +'microservicio_usuario_RN/PrestadorServlet'
    
	constructor(private http: HttpClient) {}

	getByIdViaje(idViaje: number): Observable<any> {
		return this.http.get(`${this.urlPrestadorDeServicio}?idViaje=${idViaje}`);
	}

    login(correo: string, password: string): Observable<any> {
		return this.http.post(this.urlLogin, { 
			correo,
			password  
		});
    }

	create(usuario: Usuario): Observable<any> {
		return this.http.post(this.urlUsuario, {
			nombre: usuario.nombre,
			apellido: usuario.apellido,
			correo: usuario.email,
			password: usuario.password,
			telefono: usuario.telefono,
			fechaNacimiento: usuario.fechaNacimiento,
			tipo: usuario.tipo
		});
	}

	update(usuario: Usuario): Observable<any> {
		return this.http.put(this.urlUsuario, {
			id: usuario.id,
			nombre: usuario.nombre,
			apellido: usuario.apellido,
			correo: usuario.email,
			telefono: usuario.telefono,
			tipo: usuario.tipo
		});
	}

	delete(idUsuario: number): Observable<any> {
		return this.http.delete(this.urlUsuario + `?id=${idUsuario}`);
	}
}
