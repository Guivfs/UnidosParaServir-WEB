import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NovaVagaDialogComponent } from './dialog/nova-vaga-dialog/nova-vaga-dialog.component';
import { VagasService } from '../vagas.service';
import { EditarVagaDialogComponent } from './dialog/editar-vaga-dialog/editar-vaga-dialog.component';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ExcluirVagaDialogComponent } from './dialog/excluir-vaga-dialog/excluir-vaga-dialog.component';
import { DetalharVagaDialogComponent } from './dialog/detalhar-vaga-dialog/detalhar-vaga-dialog.component';

@Component({
  selector: 'app-vagas-empresa',
  templateUrl: './vagas-empresa.component.html',
  styleUrls: ['./vagas-empresa.component.css']
})
export class VagasEmpresaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idVaga', 'tituloVaga', 'dataCriacao', 'statusVaga', 'localizacaoVaga', 'acoes'];
  dataSource = new MatTableDataSource<any>();
  totalVagas: number = 0;
  isLoading: boolean = true;
  hasError: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private vagasService: VagasService) { }

  ngOnInit(): void {
    const empresaId = 1; // Substitua pelo ID da empresa correto ou obtenha de forma dinâmica
    this.buscarVagas(empresaId);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NovaVagaDialogComponent, {
      width: '400px',
      data: { tituloVaga: '', descVaga: '', fotoVaga: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vagasService.createVaga(result).subscribe(
          () => this.buscarVagas(1), // Substitua pelo ID da empresa correto
          (error) => console.error('Erro ao criar vaga', error)
        );
      }
    });
  }

  buscarVagas(empresaId: number): void {
    this.isLoading = true;
    this.hasError = false;

    this.vagasService.getVagasByEmpresa(empresaId).pipe(
      timeout(10000), // 10 segundos
      catchError(error => {
        this.hasError = true;
        this.isLoading = false;
        return of([]);
      })
    ).subscribe(
      (data) => {
        if (data.length === 0) {
          this.hasError = true;
        }
        this.dataSource.data = data;
        this.totalVagas = data.length;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar vagas', error);
        this.isLoading = false;
        this.hasError = true;
        return of([]);
      }
    );
  }

  editarVaga(vaga: any): void {
    const dialogRef = this.dialog.open(EditarVagaDialogComponent, {
      width: '400px',
      data: {vaga}  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vagasService.updateVaga(vaga.idVaga, result).subscribe(
          () => {
            this.buscarVagas(1); // Substitua pelo ID da empresa correto
            this.atualizarPagina();
          },
          (error) => {
            console.error('Erro ao editar vaga', error);
            this.atualizarPagina();
          }
        );
      }
    });
  }

  verDetalhes(vaga: any): void {
    this.dialog.open(DetalharVagaDialogComponent, {
      width: '400px',
      data: { idVaga: vaga.idVaga }
    });
  }

  excluirVaga(vaga: any): void {
    const dialogRef = this.dialog.open(ExcluirVagaDialogComponent, {
      width: '400px',
      data: vaga
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vagasService.deleteVaga(vaga.idVaga).subscribe(
          () => this.buscarVagas(1), // Substitua pelo ID da empresa correto
          (error) => console.error('Erro ao excluir vaga', error)
        );
      }
    });
  }
  atualizarPagina(): void {
    // Recarregue a página ou atualize os dados conforme necessário
    window.location.reload(); // Recarrega a página
  }
}
