import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NovaVagaDialogComponent } from './dialog/nova-vaga-dialog/nova-vaga-dialog.component';
import { VagasService } from '../vagas.service';
import { EditarVagaDialogComponent } from './dialog/editar-vaga-dialog/editar-vaga-dialog.component';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-vagas-empresa',
  templateUrl: './vagas-empresa.component.html',
  styleUrls: ['./vagas-empresa.component.css']
})
export class VagasEmpresaComponent implements OnInit {
  displayedColumns: string[] = ['idVaga', 'tituloVaga', 'acoes'];
  dataSource = new MatTableDataSource<any>();
  totalVagas: number = 0;
  isLoading: boolean = true;
  hasError: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private vagasService: VagasService) { }

  ngOnInit(): void {
    this.buscarVagas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NovaVagaDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buscarVagas();
      }
    });
  }

  buscarVagas(): void {
    this.isLoading = true;
    this.hasError = false;

    this.vagasService.getVagasByEmpresa().pipe(
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
      }
    );
  }

  verDetalhes(vaga: any): void {
    console.log('Ver detalhes da vaga:', vaga);
  }

  editarVaga(vaga: any): void {
    const dialogRef = this.dialog.open(EditarVagaDialogComponent, {
      width: '400px',
      data: vaga
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vagasService.updateVaga(vaga.idVaga, result).subscribe(
          () => {
            this.buscarVagas();
          },
          (error) => {
            console.error('Erro ao editar vaga', error);
          }
        );
      }
    });
  }

  excluirVaga(vaga: any): void {
    this.vagasService.deleteVaga(vaga.idVaga).subscribe(
      () => {
        this.buscarVagas();
      },
      (error) => {
        console.error('Erro ao excluir vaga', error);
      }
    );
  }
}
