import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
	selector: 'app-navbar',
	imports: [RouterLink, NgIf],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css'
})
export class NavbarComponent {
	
	constructor(private router: Router) {}
	tipoUsuario: string = "";
	ngOnInit() {
		const tipo = localStorage.getItem('tipoUsuario')
		if (tipo) this.tipoUsuario = tipo;
	}
	
	login() {
		if (localStorage.getItem("idUsuario")) {
			this.router.navigate(['/user'])
		} else {
			this.router.navigate(['/login'])
		}
	}
}
