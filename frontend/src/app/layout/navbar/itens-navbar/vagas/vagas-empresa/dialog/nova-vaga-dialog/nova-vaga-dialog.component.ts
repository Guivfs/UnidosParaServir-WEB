import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VagasService } from '../../../vagas.service';

@Component({
  selector: 'app-nova-vaga-dialog',
  templateUrl: './nova-vaga-dialog.component.html',
  styleUrls: ['./nova-vaga-dialog.component.css']
})
export class NovaVagaDialogComponent implements OnInit {
  vagaForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NovaVagaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private vagasService: VagasService
  ) { }

  ngOnInit(): void {
    this.vagaForm = this.formBuilder.group({
      tituloVaga: ['', Validators.required],
      descVaga: ['', Validators.required],
      localizacaoVaga: ['', Validators.required],
      modalidadeVaga: ['', Validators.required],
      valorPagamento: [0, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.vagaForm.valid) {
      const storedId = localStorage.getItem('id');
      const empresaId = storedId ? parseInt(storedId, 10) : null;
      const vaga = {
        ...this.vagaForm.value,
        idEmpresa: empresaId,
        statusVaga: 'aberta',
        dataCriacao: new Date().toISOString().split('T')[0]
      };

      this.vagasService.createVaga(vaga).subscribe(() => {
        console.log("Vaga criada com sucesso");
        this.dialogRef.close(true);
      }, error => {
        console.error('Erro ao criar vaga', error);
        window.alert("Houve um erro interno no servidor");
      });
    } else {
      console.log("Formulário inválido");
      window.alert("O formulário é inválido");
    }
  }
}
