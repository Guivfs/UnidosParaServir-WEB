import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  loggedIn = false;

  constructor(private router: Router) {
    this.isLogged();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  isLogged() {
    const token = localStorage.getItem('token'); 
    console.log(localStorage)
    if (token) {
      this.loggedIn = true;
      console.log("O usuário está logado");
    } else {
      this.loggedIn = false;
      console.log("O usuário está deslogado");
    }
  }

  logout() {
    localStorage.removeItem('token'); // Remover o token ao fazer logout
    this.loggedIn = false;
    console.log("Usuário deslogado");
  }

}
