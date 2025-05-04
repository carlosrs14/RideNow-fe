import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private userService: UserService, private router:Router) {}
  login() {
    this.userService.login(this.email, this.password).subscribe(response => {
      console.log("Éxito:", response);
      localStorage.setItem('usuario', JSON.stringify(response));
      this.router.navigate(['/viaje']);
    }, error => {
      console.log("Error")
    });
  }
}
