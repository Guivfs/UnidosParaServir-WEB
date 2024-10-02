import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../../../account/authentication/authentication.service';
import { VagasService } from '../vagas.service';

@Component({
  selector: 'app-vagas-usuario',
  templateUrl: './vagas-usuario.component.html',
  styleUrls: ['./vagas-usuario.component.css']
})
export class VagasUsuarioComponent implements OnInit {
  role: string = 'guest';
  loggedIn: boolean = false;
  searchTerm: string = '';
  vagas: any[] = [];

  constructor(
    private router: Router, 
    public dialog: MatDialog, 
    private authenticationService: AuthenticationService,
    private vagasService: VagasService
  ) {}

  ngOnInit(): void {

  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  isLogged() {
    const token = this.authenticationService.getToken();
    this.loggedIn = !!token;
    console.log(`O usuário está ${this.loggedIn ? 'logado' : 'deslogado'}`);
  }

  checkUserRole() {
    this.role = "guest";
    this.role = this.authenticationService.getRole();
  }
  

  buscarVagas() {
    this.router.navigate(['resultados-pesquisa'], { queryParams: { searchTerm: this.searchTerm } });
  }
}
