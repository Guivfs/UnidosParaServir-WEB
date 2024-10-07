import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { VagasService } from '../../../../vagas.service';
import { PerfilUsuarioDialogComponent } from '../perfil-usuario-dialog/perfil-usuario-dialog.component';

@Component({
  selector: 'app-candidaturas-dialog',
  templateUrl: './candidaturas-dialog.component.html',
  styleUrls: ['./candidaturas-dialog.component.css']
})
export class CandidaturasDialogComponent {
  candidaturas: any[] = [];

  constructor(
    private vagasService: VagasService,
    private dialogRef: MatDialogRef<CandidaturasDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { idVaga: number }
  ) {
    // Chama o serviço para obter as candidaturas da vaga
    this.vagasService.getCandidaturasByVaga(data.idVaga).subscribe((res) => {
      this.candidaturas = res;
    });
  }

  visualizarPerfil(idVaga: number, idUsuario: number): void {
    // Abrir o dialog do perfil do usuário e registrar a visita
    const dialogRef = this.dialog.open(PerfilUsuarioDialogComponent, {
      width: '500px',
      data: { idVaga, idUsuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Chamar o serviço para registrar a visita ao perfil
      this.vagasService.registrarVisitaPerfil(idUsuario).subscribe((res) => {
        console.log('Visita registrada com sucesso:', res);
      });
    });
  }

  preencherVaga(idVaga: number, idUsuario: number): void {
    const preenchimentoData = {
      idUsuario: idUsuario,
      statusVaga: 'Preenchida'
    };

    // Chama o serviço para preencher a vaga com o usuário especificado
    this.vagasService.preencherVaga(idVaga, preenchimentoData).subscribe(
      (res) => {
        console.log('Vaga preenchida com sucesso:', res);
      },
      (error) => {
        console.error('Erro ao preencher a vaga:', error);
      }
    );
  }
}
