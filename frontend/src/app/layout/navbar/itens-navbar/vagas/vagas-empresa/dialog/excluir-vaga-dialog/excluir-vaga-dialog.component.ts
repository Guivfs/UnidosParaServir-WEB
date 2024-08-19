import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VagasService } from '../../../vagas.service';

@Component({
  selector: 'app-excluir-vaga-dialog',
  templateUrl: './excluir-vaga-dialog.component.html',
  styleUrls: ['./excluir-vaga-dialog.component.css']
})
export class ExcluirVagaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ExcluirVagaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vagasService: VagasService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmarExclusao(): void {
    this.vagasService.deleteVaga(this.data.idVaga).subscribe(
      () => this.dialogRef.close(true),
      (error) => console.error('Erro ao excluir vaga', error)
    );
  }
}
