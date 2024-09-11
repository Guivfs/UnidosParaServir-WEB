import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VagasService } from '../../../vagas.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalhar-vaga-dialog',
  templateUrl: './detalhar-vaga-dialog.component.html',
  styleUrls: ['./detalhar-vaga-dialog.component.css']
})
export class DetalharVagaDialogComponent implements OnInit {
  vaga: any;
  usuario: any;
  id!: number;

  constructor(
    private vagasService: VagasService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any // Recebendo os dados passados pelo matDialog
  ) {}

  ngOnInit(): void {
    this.id = this.data.idVaga; // Pegando o ID da vaga a partir dos dados recebidos
    this.obterVaga();
  }

  obterVaga(): void {
    this.vagasService.getVagaById(this.id.toString()).subscribe((data) => {
      this.vaga = data.vaga;
      this.usuario = data.usuario;
      
      // Formata a data no formato brasileiro
      this.vaga.dataCriacao = this.datePipe.transform(this.vaga.dataCriacao, 'dd/MM/yyyy');
    }, (error) => {
      console.error('Erro ao buscar detalhes da vaga:', error);
    });
  }
}
