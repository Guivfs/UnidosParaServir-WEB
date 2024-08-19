import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VagasService } from '../../../vagas.service';

@Component({
  selector: 'app-editar-vaga-dialog',
  templateUrl: './editar-vaga-dialog.component.html',
  styleUrls: ['./editar-vaga-dialog.component.css']
})
export class EditarVagaDialogComponent implements OnInit {
  vagaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarVagaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private vagasService: VagasService
  ) {
    this.vagaForm = this.fb.group({
      idVaga: [data.idVaga],
      tituloVaga: [data.tituloVaga],
      descVaga: [data.descVaga],
      fotoVaga: [data.fotoVaga],
      idEmpresa: [data.idEmpresa]
    });
  }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  salvarAlteracoes(): void {
    if (this.vagaForm.valid) {
      this.vagasService.updateVaga(this.vagaForm.value.idVaga, this.vagaForm.value).subscribe(
        () => this.dialogRef.close(true),
        (error) => console.error('Erro ao editar vaga', error)
      );
    }
  }
}
