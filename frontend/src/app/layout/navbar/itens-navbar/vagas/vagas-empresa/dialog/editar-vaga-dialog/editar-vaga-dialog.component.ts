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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditarVagaDialogComponent>,
    private formBuilder: FormBuilder,
    private vagasService: VagasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.vaga = this.data.vaga;
    this.usuario = this.vaga.usuario;

    // Recupera o ID da empresa do localStorage
    const storedId = localStorage.getItem('id');
    this.empresaId = storedId ? parseInt(storedId, 10) : null;

    console.log('ID da Empresa recuperado:', this.empresaId); // Adicione este console.log

    this.editarVagaForm = this.formBuilder.group({
      tituloVaga: [this.vaga.tituloVaga, Validators.required],
      descVaga: [this.vaga.descVaga, Validators.required],
      localizacaoVaga: [this.vaga.localizacaoVaga, Validators.required],
      valorPagamento: [this.vaga.valorPagamento, Validators.required],
      statusVaga: [this.vaga.statusVaga, Validators.required],
      dataCriacao: [this.vaga.dataCriacao || new Date(), Validators.required]  // Campo adicionado,
    });
  }

  atualizarVaga(): void {
    if (this.editarVagaForm.valid) {
      const statusVaga = this.editarVagaForm.value.statusVaga;
  
      // Se o status for "Aberta" e a vaga estava "Preenchida", solicite confirmação
      if (statusVaga === 'Aberta' && this.vaga.statusVaga === 'Preenchida') {
        const dialogRef = this.dialog.open(ConfirmacaoDemissaoDialogComponent);
  
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.vagasService.demitirUsuario(this.vaga.idVaga).subscribe(() => {
              this.editarVagaForm.patchValue({ statusVaga: 'Aberta' });
              this.salvarVaga();
            }, error => {
              console.error('Erro ao demitir o usuário:', error);
            });
          }
        });
      } else {
        this.salvarVaga();
      }
    }
  }
  
  salvarVaga(): void {
    if (this.editarVagaForm.valid) {
      const vagaAtualizada = { 
        ...this.editarVagaForm.value, 
        idEmpresa: this.empresaId,
        idUsuario: this.editarVagaForm.value.idUsuario || null // Define como null se não estiver definido
      };
  
      console.log('Dados da vaga atualizada:', vagaAtualizada); // Verifica os dados
  
      this.vagasService.updateVaga(this.vaga.idVaga, vagaAtualizada).subscribe(
        (response) => {
          console.log('Vaga atualizada com sucesso:', response);
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
      if (result) {
        this.vagasService.demitirUsuario(this.vaga.idVaga).subscribe(() => {
          this.vaga.statusVaga = 'Aberta';
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
