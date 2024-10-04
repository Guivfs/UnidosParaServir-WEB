import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VagasService } from '../../../vagas.service';
import { ConfirmacaoDemissaoDialogComponent } from './confirmar-demissao/confirmacao-demissao-dialog/confirmacao-demissao-dialog.component';

@Component({
  selector: 'app-editar-vaga-dialog',
  templateUrl: './editar-vaga-dialog.component.html',
  styleUrls: ['./editar-vaga-dialog.component.css']
})
export class EditarVagaDialogComponent implements OnInit {
  editarVagaForm!: FormGroup;
  vaga: any;
  usuario: any;
  empresaId: number | null = null;
  demitirUsuarioConfirmado = false; // Flag para controlar se o usuário foi demitido

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditarVagaDialogComponent>,
    private formBuilder: FormBuilder,
    private vagasService: VagasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.vaga = this.data.vaga;
  
    console.log("USUARIO",this.vaga.usuario)
    const storedId = localStorage.getItem('id');
    this.empresaId = storedId ? parseInt(storedId, 10) : null;
    this.editarVagaForm = this.formBuilder.group({
      tituloVaga: [this.vaga.tituloVaga, Validators.required],
      descVaga: [this.vaga.descVaga, Validators.required],
      localizacaoVaga: [this.vaga.localizacaoVaga, Validators.required],
      valorPagamento: [this.vaga.valorPagamento, Validators.required],
      statusVaga: [this.vaga.statusVaga, Validators.required],
      dataCriacao: [this.vaga.dataCriacao || null, Validators.required]
    });
    this.vagasService.getVagaByIdEmpresa(this.data.vaga.idVaga).subscribe((response) => {
      this.vaga = response.vaga;
    });
  }

  atualizarVaga(): void {
    if (this.editarVagaForm.valid) {
      // Só mudar o status da vaga se o usuário foi demitido
      if (this.demitirUsuarioConfirmado) {
        this.editarVagaForm.patchValue({ statusVaga: 'Aberta' });
      }
      
      this.salvarVaga(); // Salva a vaga com o status apropriado
    }
  }

  salvarVaga(): void {
    if (this.editarVagaForm.valid) {
      const vagaAtualizada = { 
        ...this.editarVagaForm.value, 
        idEmpresa: this.empresaId,
        idUsuario: this.editarVagaForm.value.idUsuario || null
      };
  
      this.vagasService.updateVaga(this.vaga.idVaga, vagaAtualizada).subscribe(
        (response) => {
          console.log('Vaga atualizada com sucesso:', response);
          this.demitirUsuarioConfirmado = false; // Reset do estado
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Erro ao atualizar a vaga:', error);
          alert('Ocorreu um erro ao tentar salvar a vaga. Tente novamente.');
        }
      );
    } else {
      console.log('Formulário inválido, por favor, preencha todos os campos corretamente.');
    }
  }

  demitirUsuario(): void {
    this.dialog.open(ConfirmacaoDemissaoDialogComponent).afterClosed().subscribe(result => {
      if (result === true) {
        this.vagasService.demitirUsuario(this.vaga.idVaga).subscribe(() => {
          this.demitirUsuarioConfirmado = true; // Marca como demitido
        }, error => {
          console.error('Erro ao demitir o usuário:', error);
        });
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}