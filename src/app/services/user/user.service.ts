import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl +'microservicio_usuario_RN/LoginServlet'
  constructor(private http: HttpClient) {}
  login(correo: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { 
      correo,
      password  
    });
  }
}
