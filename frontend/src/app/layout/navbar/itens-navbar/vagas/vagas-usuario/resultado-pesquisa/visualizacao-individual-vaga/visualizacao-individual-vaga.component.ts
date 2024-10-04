import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VagasService } from '../../../vagas.service';
import { AuthenticationService } from '../../../../../../account/authentication/authentication.service';

@Component({
  selector: 'app-visualizacao-individual-vaga',
  templateUrl: './visualizacao-individual-vaga.component.html',
  styleUrls: ['./visualizacao-individual-vaga.component.css']
})
export class VisualizacaoIndividualVagaComponent implements OnInit {
  vaga: any;  // Armazena as informações da vaga
  idVaga: string = '';  // ID da vaga atual
  idUsuario: string | null = null;  // ID do usuário logado (null se não logado)
  jaCandidatado: boolean = false;  // Indica se o usuário já se candidatou

  constructor(
    private route: ActivatedRoute,  // Para acessar parâmetros da rota
    private vagasService: VagasService,  // Serviço de vagas para acessar a API
    private authService: AuthenticationService,  // Serviço de autenticação para obter informações do usuário logado
    private router: Router  // Router para redirecionamento de rotas
  ) {}

  ngOnInit(): void {
    // Obtém o ID da vaga a partir dos parâmetros da rota
    this.route.params.subscribe(params => {
      this.idVaga = params['id'];
      if (this.idVaga) {
        this.buscarDetalhesVaga(this.idVaga);
      }
    });

    // Obtém o ID do usuário logado (null se não estiver logado)
    this.idUsuario = this.authService.getUserId();

    // Se o usuário estiver logado, verificar se ele já se candidatou a essa vaga
    if (this.idUsuario) {
      this.verificarCandidatura();
    }
  }

  // Método para buscar os detalhes da vaga a partir do ID
  buscarDetalhesVaga(id: string): void {
    this.vagasService.getVagaById(id).subscribe(
      (response) => {
        this.vaga = response.vaga;
      },
      (error) => {
        console.error('Erro ao buscar detalhes da vaga:', error);
      }
    );
  }

  // Método para verificar se o usuário já se candidatou à vaga
  verificarCandidatura(): void {
    if (this.idUsuario) {
      this.vagasService.verificarCandidaturaUsuario(this.idVaga, this.idUsuario).subscribe(
        (response: any) => {
          this.jaCandidatado = response.jaCandidatado;
        },
        (error) => {
          console.error('Erro ao verificar candidatura:', error);
        }
      );
    }
  }

  // Método para candidatar o usuário à vaga
  candidatarVaga(): void {
    // Verifica se o usuário está logado antes de permitir a candidatura
    if (!this.idUsuario) {
      alert('Você precisa estar logado para se candidatar a uma vaga.');
      this.router.navigate(['/login']);  // Redireciona para a página de login
      return;
    }

    // Se o usuário já se candidatou, exibe um alerta e interrompe a operação
    if (this.jaCandidatado) {
      alert('Você já se candidatou a esta vaga!');
      return;
    }

    const candidatura = {
      idVaga: this.vaga.idVaga,
      idUsuario: this.idUsuario,  // Inclui o ID do usuário para a candidatura
      statusCandidatura: 'pendente'
    };

    // Chama o serviço para criar a candidatura
    this.vagasService.candidatarUsuario(candidatura).subscribe(
      (response) => {
        this.jaCandidatado = true;  // Atualiza o estado para indicar que o usuário já se candidatou
      },
      (error) => {
        if (error.status === 409) {
          alert('Você já se candidatou para esta vaga!');
        } else {
          console.error('Erro ao se candidatar à vaga:', error);
          alert('Erro ao se candidatar. Tente novamente mais tarde.');
        }
      }
    );
  }
}
