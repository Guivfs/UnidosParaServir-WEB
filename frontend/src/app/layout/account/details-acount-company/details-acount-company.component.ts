import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DetailsAcountCompanyService } from "./details-acount-company.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NavbarComponent } from "../../navbar/navbar.component";
import { DeleteConfirmationDialogComponent } from "./dialog/delete-confirmation-dialog/delete-confirmation-dialog.component";
import { UpdateConfirmationDialogComponent } from "./dialog/update-confirmation-dialog/update-confirmation-dialog.component";

@Component({
  selector: "app-details-acount-company",
  templateUrl: "./details-acount-company.component.html",
  styleUrl: "./details-acount-company.component.css",
})
export class DetailsAcountCompanyComponent implements OnInit {
  profileFormCompany: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private dialogRef: MatDialogRef<NavbarComponent>,
    private detailsAccontCompanyService: DetailsAcountCompanyService
  ) {
    this.profileFormCompany = this.fb.group({
      nomeEmpresa: [{ value: "", disabled: true }],
      razaoSocialEmpresa: [{ value: "", disabled: true }],
      areaAtuacaoEmpresa: [{ value: "", disabled: true }],
      numeroFuncionariosEmpresa: [{ value: "", disabled: true }],
      ramoEmpresa: [{ value: "", disabled: true }],
      emailEmpresa: [{ value: "", disabled: true }],
      senhaEmpresa: [{ value: "", disabled: true }],
    });
  }
  ngOnInit(): void {
    this.loadDetailsAccountCompany();
  }


  openEditDialog():void {
    this.dialogRef.close()
    const dialogRef = this.dialog.open(UpdateConfirmationDialogComponent,{
      width:'500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDetailsAccountCompany()
        this.dialog.open(DetailsAcountCompanyComponent,{
          width:'500px'
        });
      }
    });
  }

  loadDetailsAccountCompany():void{
    this.detailsAccontCompanyService.getCompany().subscribe(
      (data) => {
        console.log("empresa:", data);
        this.profileFormCompany.patchValue({
          nomeEmpresa: data.nomeEmpresa,
          razaoSocialEmpresa: data.razaoSocialEmpresa,
          areaAtuacaoEmpresa: data.areaAtuacaoEmpresa,
          numeroFuncionariosEmpresa: data.numeroFuncionariosEmpresa,
          ramoEmpresa: data.ramoEmpresa,
          emailEmpresa: data.emailEmpresa,
          senhaEmpresa: data.senhaEmpresa,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDeleteConfirmationDialog():void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent)
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.deleteAccount();
      }
    });
  }
  deleteAccount():void{
    this.detailsAccontCompanyService.deleteCompany().subscribe(
      response =>{
        localStorage.clear();    
        this.dialogRef.close();
        this.router.navigate(['/login'])
      },
      error=>{
        console.error('Erro ao excluir a conta:', error);
      }
    )
  }
}
