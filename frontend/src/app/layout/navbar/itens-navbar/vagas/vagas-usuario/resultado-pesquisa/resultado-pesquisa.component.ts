import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VagasService } from '../../vagas.service';

interface Vaga {
  idVaga: number; 
  tituloVaga: string;
  nomeEmpresa: string;       
  localizacaoVaga: string;    
  dataCriacao: Date;       
  descVaga?: string;         
  fotoVaga?: string;       
  idEmpresa?: number;        
  idUsuario?: number;   
  modalidadeVaga?: string;  
  statusVaga?: string;       
  valorPagamento?: string;    
}

@Component({
  selector: 'app-resultado-pesquisa',
  templateUrl: './resultado-pesquisa.component.html',
  styleUrls: ['./resultado-pesquisa.component.css']
})
export class ResultadoPesquisaComponent implements OnInit {
  vagas: Vaga[] = [];
  searchTerm: string = '';

  constructor(private route: ActivatedRoute, private vagasService: VagasService, private router:Router) {} // Injetar VagasService


  ngOnInit(): void {
    // Busca inicial com base no parâmetro de URL, se houver
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.buscarVagas(this.searchTerm);
    });
    this.route.params.subscribe(params => {
      const idVaga = params['id'];
      this.buscarVagaPorId(idVaga);
    });
  }

  buscarVagaPorId(id: string): void {
    this.vagasService.getVagaById(id).subscribe(
      (response) => {
        this.vagas = response;
        console.log(this.vagas);  // Verifique se os detalhes da vaga foram carregados corretamente
      },
      (error) => {
        console.error('Erro ao buscar detalhes da vaga:', error);
      }
    );
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.buscarVagas(this.searchTerm);
  }

  buscarVagas(term: string): void {
    // Chama o serviço para buscar vagas pelo título fornecido
    this.vagasService.getVagasByTitulo(term).subscribe(
      (response) => {
        this.vagas = response;
        console.log(this.vagas)
      },
      (error) => {
        console.error('Erro ao buscar vagas:', error);
      }
    );
  }

  viewVaga(idVaga: number): void {
    console.log('ID da Vaga Selecionada:', idVaga);
    this.router.navigate(['/visualizar-vaga', idVaga]);  // Navegar para a página de visualização com o ID da vaga
  }
}
