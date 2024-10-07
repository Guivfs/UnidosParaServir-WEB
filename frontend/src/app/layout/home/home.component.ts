import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../account/authentication/authentication.service';
import { VagasService } from '../navbar/itens-navbar/vagas/vagas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  role: string = 'guest';
  quantidadeNovasCandidaturas: number = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private vagasService: VagasService
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
    if (this.role === 'company') {
      this.obterQuantidadeNovasCandidaturas();
    }
  }

  checkUserRole() {
    this.role = this.authenticationService.getRole();
  }

  obterQuantidadeNovasCandidaturas() {
    this.vagasService.obterQuantidadeNovasCandidaturas().subscribe(
      (data) => {
        console.log("Quantidade de novas candidaturas recebida:", data);

        // Atualize para acessar corretamente 'novasCandidaturas'.
        if (data && data.hasOwnProperty('novasCandidaturas')) {
          this.quantidadeNovasCandidaturas = data.novasCandidaturas ?? 0;
        } else {
          this.quantidadeNovasCandidaturas = 0;
        }
      },
      (error) => {
        console.error('Erro ao obter quantidade de novas candidaturas:', error);
        this.quantidadeNovasCandidaturas = 0; // Definir como 0 em caso de erro.
      }
    );
  }
}
