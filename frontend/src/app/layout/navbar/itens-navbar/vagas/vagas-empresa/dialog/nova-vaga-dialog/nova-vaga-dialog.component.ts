import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VagasService } from '../../../vagas.service';

@Component({
  selector: 'app-nova-vaga-dialog',
  templateUrl: './nova-vaga-dialog.component.html',
  styleUrls: ['./nova-vaga-dialog.component.css']
})
export class NovaVagaDialogComponent {
  vagaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NovaVagaDialogComponent>,
    private fb: FormBuilder,
    private vagasService: VagasService
  ) {
    this.vagaForm = this.fb.group({
      tituloVaga: [''],
      descVaga: [''],
      fotoVaga: [''],
      idEmpresa: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  criarVaga(): void {
    if (this.vagaForm.valid) {
      console.log("vaga:",this.vagaForm)
      this.vagasService.createVaga(this.vagaForm.value).subscribe(
        () => this.dialogRef.close(true),
        (error) => console.error('Erro ao criar vaga', error)
      );
    }
  }
}
