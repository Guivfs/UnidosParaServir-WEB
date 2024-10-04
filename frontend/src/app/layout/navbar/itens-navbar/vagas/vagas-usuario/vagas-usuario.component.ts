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

  // Variáveis para armazenar os dados
  visitasCV: number = 0;
  totalCVsEnviados: number = 0;

  constructor(
    private router: Router, 
    public dialog: MatDialog, 
    private authenticationService: AuthenticationService,
    private vagasService: VagasService
  ) {}

  ngOnInit(): void {
    this.isLogged();
    this.checkUserRole();

    if (this.loggedIn) {
      this.obterVisitasCV();
      this.obterCandidaturas();
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  isLogged() {
    const token = this.authenticationService.getToken();
    this.loggedIn = !!token;
    console.log(`O usuário está ${this.loggedIn ? 'logado' : 'deslogado'}`);
    console.log(token)
  }

  checkUserRole() {
    this.role = "guest";
    this.role = this.authenticationService.getRole();
  }

  buscarVagas() {
    this.router.navigate(['resultados-pesquisa'], { queryParams: { searchTerm: this.searchTerm } });
  }

  // Função para obter o número de visitas ao CV utilizando o service
  obterVisitasCV(): void {
    this.vagasService.getVisitasCV().subscribe(
      (res) => {
        this.visitasCV = res.length || 0; // Contabiliza o número de visitas ao CV
      },
      (error) => {
        console.error('Erro ao obter visitas ao CV:', error);
      }
    );
  }

  // Função para obter o número total de candidaturas utilizando o service
  obterCandidaturas(): void {
    this.vagasService.getCandidaturas().subscribe(
      (res) => {
        this.totalCVsEnviados = res.length || 0; // Contabiliza o número de candidaturas
      },
      (error) => {
        console.error('Erro ao obter candidaturas:', error);
      }
    );
  }
}
