import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  private apiUrl = 'http://localhost:8080/microservicio_viajes_RN/ViajeServlet';

  constructor(private http: HttpClient) {}

  listarViajes(): Observable<{ resultado: string, viajes: any[] }> {
    return this.http.get<{ resultado: string, viajes: any[] }>(`${this.apiUrl}?metodo=listar`);
  }
}
