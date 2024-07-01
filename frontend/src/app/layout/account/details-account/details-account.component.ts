import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetailsAccountService } from './details-account.service';
import { DeleteConfirmationDialogComponent } from './dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UpdateAccountComponent } from './dialog/update/update-account/update-account.component';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-details-account',
  templateUrl: './details-account.component.html',
  styleUrls: ['./details-account.component.css']
})
export class DetailsAccountComponent implements OnInit {
  profileFormUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private dialogRef: MatDialogRef<NavbarComponent>,
    private detailsAccountService: DetailsAccountService
  ) {
    this.profileFormUser = this.fb.group({
      nomeCompleto: [{ value: '', disabled: true }],
      cep: [{ value: '', disabled: true }],
      usuario: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      senha: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.detailsAccountService.getUser().subscribe((data) => {
      console.log('user:', data);
      this.profileFormUser.patchValue({
        nomeCompleto: data.nomeUsuario,
        cep: data.cepUsuario,
        usuario: data.userUsuario,
        email: data.emailUsuario,
        senha: data.senhaUsuario
      });
    },
    (error) => {
      console.log(error);
    });
  }

  openDeleteConfirmationDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAccount();
      }
    });
  }

  deleteAccount(): void {
    this.detailsAccountService.deleteAccount().subscribe(
      response => {
        localStorage.clear();
        this.dialogRef.close();
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Erro ao excluir a conta:', error);
      }
    );
  }

  openEditAccount(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(UpdateAccountComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Recarregar dados do usuário
        this.ngOnInit();
      }
    });
  }
}
