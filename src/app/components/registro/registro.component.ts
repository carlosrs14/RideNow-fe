import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterModule],
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  user = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    fechaNacimiento: '',
    tipoUsuario : '',
    password : '',
    passwordConfirm : ''
  }
  passwordMismatch = false;
  constructor(private http: HttpClient, private router: Router) {}

  checkPasswordMatch() {
    this.passwordMismatch = this.user.password !== this.user.passwordConfirm;
  }

  register() {
    if (this.passwordMismatch) {
      alert("Passwords Not match");
      return;
    }
    this.http.post(environment.apiUrl + 'microservicio_usuario_RN/UsuarioServlet', this.user).subscribe({
      next: (res) => {
        alert('Registro exitoso');
        this.router.navigate(['/viaje']);
      },
      error: (err) => alert('Error al registrarse: ' + JSON.stringify(err.error))
    });
  }
}


