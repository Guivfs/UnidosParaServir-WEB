import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DetailsAccountService } from '../../../details-account.service';
import { DetailsAccountComponent } from '../../../details-account.component';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  profileFormUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private detailsAccountService: DetailsAccountService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UpdateAccountComponent>
  ) {
    this.profileFormUser = this.fb.group({
      nomeCompleto: ['', Validators.required],
      cep: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.detailsAccountService.getUser().subscribe(user => {
      this.profileFormUser.patchValue({
        nomeCompleto: user.nomeUsuario,
        cep: user.cepUsuario,
        usuario: user.userUsuario,
        email: user.emailUsuario,
        senha: ""
      });
    },
    (error) => {
      console.log(error);
    });
  }

  updateAccount(): void {
    const userData = {
      nomeUsuario: this.profileFormUser.value.nomeCompleto,
      cepUsuario: this.profileFormUser.value.cep,
      userUsuario: this.profileFormUser.value.usuario,
      emailUsuario: this.profileFormUser.value.email,
      senhaUsuario: this.profileFormUser.value.senha,
    };

    this.detailsAccountService.updateAccount(userData).subscribe(
      response => {
        console.log('Usuário atualizado com sucesso');
        this.dialogRef.close(true);
      },
      error => {
        console.error('Erro ao atualizar a conta:', error);
      }
    );
  }

  cancelEdit(): void {
    this.dialogRef.close(false);
  }
}
