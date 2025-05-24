import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private http: HttpClient) {}

  listarViajes(): Observable<any> {
    return this.http.get(environment.apiUrl + "microservicio_viajes_RN/ViajeServlet");
  }
}
