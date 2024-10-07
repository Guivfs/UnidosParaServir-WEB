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
import { CandidaturasDialogComponent } from './dialog/candidatura/candidaturas-dialog/candidaturas-dialog.component';

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
    const empresaId = 1;
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
        this.buscarVagas(1);
      }
    });
  }


  buscarVagas(empresaId: number): void {
    this.isLoading = true;
    this.hasError = false;
    this.vagasService.getVagasByEmpresa(empresaId).pipe(
      timeout(10000),
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
      data: { vaga }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atualizarPagina();
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
        this.buscarVagas(1);
      }
    });
  }

  openCandidaturasDialog(vaga: any): void {
    const dialogRef = this.dialog.open(CandidaturasDialogComponent, {
      width: '600px',
      data: { idVaga: vaga.idVaga }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.buscarVagas(1); // Atualiza a lista de vagas após ver candidaturas
    });
  }

  atualizarPagina(): void {
    window.location.reload();
  }
}
