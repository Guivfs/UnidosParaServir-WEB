  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { VagasService } from '../../../vagas.service';

  @Component({
    selector: 'app-visualizacao-individual-vaga',
    templateUrl: './visualizacao-individual-vaga.component.html',
    styleUrls: ['./visualizacao-individual-vaga.component.css']
  })
  export class VisualizacaoIndividualVagaComponent implements OnInit {
    vaga: any;
    idVaga: string = '';

    constructor(private route: ActivatedRoute, private vagasService: VagasService) {}

    ngOnInit(): void {
      // Obter o ID da vaga a partir dos parâmetros da rota
      this.route.params.subscribe(params => {
        this.idVaga = params['id'];
        console.log('ID da Vaga:', this.idVaga);

        // Buscar a vaga apenas se o ID for válido
        if (this.idVaga) {
          this.buscarDetalhesVaga(this.idVaga);
        }
      });
    }

    buscarDetalhesVaga(id: string): void {
      // Chamar o serviço para obter detalhes da vaga pelo ID
      this.vagasService.getVagaById(id).subscribe(
        (response) => {
          this.vaga = response.vaga;
          console.log('Detalhes da Vaga:', this.vaga);
        },
        (error) => {
          console.error('Erro ao buscar detalhes da vaga:', error);
        }
      );
    }
    candidatarVaga(): void {
      alert(`Candidatando-se à vaga: ${this.vaga?.tituloVaga}`);
      // Aqui você pode chamar um serviço ou realizar alguma lógica de candidatura
    }
  }
