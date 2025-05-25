import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
	selector: 'app-navbar',
	imports: [RouterLink],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css'
})
export class NavbarComponent {
	
	constructor(private router: Router) {}
	
	login() {
		if (localStorage.getItem("idUsuario")) {
			this.router.navigate(['/user'])
		} else {
			this.router.navigate(['/login'])
		}
	}
}
