import { Injectable } from '@angular/core';
import { Denuncia } from '../../models/Denuncia';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DenunciaService {
  private urlDenuncia = environment.apiUrl + '8081/denuncias/DenunciaServlet'

  constructor(private http: HttpClient) { }

  create(denuncia: Denuncia): Observable<any> {
    return this.http.post(this.urlDenuncia, {
      fecha: denuncia.fecha.toISOString().split('T')[0],
      descripcion: denuncia.descripcion,
      idCliente: denuncia.idCliente,
      idPrestadorDeServicio: denuncia.idPrestadorDeServicio
    });
  }

  all(): Observable<any> {
    return this.http.get(this.urlDenuncia);
  }

  filterByOwner(idCliente: number): Observable<any> {
    return this.http.get(this.urlDenuncia + `?idCliente=${idCliente}`);
  }

  update(denuncia: Denuncia): Observable<any> {
    return this.http.put(this.urlDenuncia, {
      id: denuncia.id,
      fecha: denuncia.fecha,
      descripcion: denuncia.descripcion,
      estado: denuncia.estado,
      idCliente: denuncia.idCliente,
      idPrestadorDeServicio: denuncia.idPrestadorDeServicio
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.urlDenuncia +`?id=${id}`);
  }
}
