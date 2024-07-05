// vagas-empresa.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NovaVagaDialogComponent } from './dialog/nova-vaga-dialog/nova-vaga-dialog.component';

@Component({
  selector: 'app-vagas-empresa',
  templateUrl: './vagas-empresa.component.html',
  styleUrls: ['./vagas-empresa.component.css']
})
export class VagasEmpresaComponent implements OnInit {
  vagas: any[] = []; // Array de vagas (simulado)

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.buscarVagas()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NovaVagaDialogComponent, {
      width: '400px',
      data: {} // Você pode passar dados para o diálogo se necessário
    });

    dialogRef.afterClosed().subscribe(result => {
      // Aqui você pode lidar com os dados retornados após fechar o diálogo
      console.log('O diálogo foi fechado', result);
      // Atualize a lista de vagas após a criação de uma nova vaga, se necessário
    });
  }

  buscarVagas():void{
    // Aqui você pode inicializar a lista de vagas a partir de um serviço ou mock de dados
    this.vagas = [
      { idVaga: 1, tituloVaga: 'Desenvolvedor Web', descricao: 'Descrição da vaga de desenvolvedor web.' },
      { idVaga: 2, tituloVaga: 'Designer UI/UX', descricao: 'Descrição da vaga de designer UI/UX.' }
      // Adicione mais vagas conforme necessário
    ];
  }
  verDetalhes(vaga: any): void {
    // Implemente a lógica para visualizar os detalhes da vaga
    console.log('Ver detalhes da vaga:', vaga);
  }

  editarVaga(vaga: any): void {
    // Implemente a lógica para editar a vaga
    console.log('Editar vaga:', vaga);
  }

  excluirVaga(vaga: any): void {
    // Implemente a lógica para excluir a vaga
    console.log('Excluir vaga:', vaga);
  }
}
