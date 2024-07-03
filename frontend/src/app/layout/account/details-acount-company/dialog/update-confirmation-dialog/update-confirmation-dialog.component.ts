import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsAcountCompanyService } from '../../details-acount-company.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailsAcountCompanyComponent } from '../../details-acount-company.component';

@Component({
  selector: 'app-update-confirmation-dialog',
  templateUrl: './update-confirmation-dialog.component.html',
  styleUrls: ['./update-confirmation-dialog.component.css']
})
export class UpdateConfirmationDialogComponent implements OnInit {

  profileFormCompany!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private detailsAccountCompanyService: DetailsAcountCompanyService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UpdateConfirmationDialogComponent>
  ) {
    this.profileFormCompany = this.fb.group({
      nomeEmpresa: ['', Validators.required],
      razaoSocialEmpresa: ['', Validators.required],
      areaAtuacaoEmpresa: ['', Validators.required],
      numeroFuncionariosEmpresa: ['', Validators.required],
      ramoEmpresa: ['', Validators.required],
      emailEmpresa: ['', [Validators.required, Validators.email]],
      senhaEmpresa: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.detailsAccountCompanyService.getCompany().subscribe((data) => {
      this.profileFormCompany.patchValue({
        nomeEmpresa: data.nomeEmpresa,
        razaoSocialEmpresa: data.razaoSocialEmpresa,
        areaAtuacaoEmpresa: data.areaAtuacaoEmpresa,
        numeroFuncionariosEmpresa: data.numeroFuncionariosEmpresa,
        ramoEmpresa: data.ramoEmpresa,
        emailEmpresa: data.emailEmpresa,
        senhaEmpresa: "",
      });
    },
    (error) => {
      console.log(error);
    });
  }
  
  updateAccount(): void {
    const companyData = {
      nomeEmpresa: this.profileFormCompany.value.nomeEmpresa,
      razaoSocialEmpresa: this.profileFormCompany.value.razaoSocialEmpresa,
      areaAtuacaoEmpresa: this.profileFormCompany.value.areaAtuacaoEmpresa,
      numeroFuncionariosEmpresa: this.profileFormCompany.value.numeroFuncionariosEmpresa,
      ramoEmpresa: this.profileFormCompany.value.ramoEmpresa,
      emailEmpresa: this.profileFormCompany.value.emailEmpresa,
      senhaEmpresa: this.profileFormCompany.value.senhaEmpresa,
      descEmpresa: this.profileFormCompany.value.descEmpresa,
      CNPJEmpresa: this.profileFormCompany.value.CNPJEmpresa
    };

    
    this.detailsAccountCompanyService.updateAccount(companyData).subscribe(
      response => {
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
