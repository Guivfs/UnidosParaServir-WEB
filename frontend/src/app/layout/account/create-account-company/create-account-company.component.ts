import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CreateAccountCompanyService } from "./create-account-company.service";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PrivacyPoliciesDialogComponent } from "../../termsAndConditions/privacy-policies-dialog/privacy-policies-dialog.component";

@Component({
  selector: "app-create-account-company",
  templateUrl: "./create-account-company.component.html",
  styleUrls: ["./create-account-company.component.css"],
})
export class CreateAccountCompanyComponent implements OnInit {
  empresaForm: FormGroup;
  aceitouTermos: boolean = false;  // Variável para verificar se os termos foram aceitos

  constructor(
    private fb: FormBuilder,
    private empresaService: CreateAccountCompanyService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog  // Injeção do MatDialog
  ) {
    // Criação do FormGroup e seus controles com validações
    this.empresaForm = this.fb.group({
      nomeEmpresa: ['', Validators.required],
      areaAtuacaoEmpresa: ['', Validators.required],
      emailEmpresa: ['', [Validators.required, Validators.email]],
      senhaEmpresa: ['', [Validators.required, Validators.minLength(6)]],
      descEmpresa: ['', Validators.required],
      CNPJEmpresa: ['', Validators.required],
      razaoSocialEmpresa: ['', Validators.required],
      ramoEmpresa: ['', Validators.required],
      numeroFuncionariosEmpresa: ['', Validators.required]  
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Status do campo "aceitouTermos":', this.aceitouTermos);  // Log para verificar o status
    if (this.empresaForm.valid && this.aceitouTermos) {
      this.empresaService.cadastrarEmpresa(this.empresaForm.value).subscribe(
        response => {
          console.log('Empresa cadastrada com sucesso!', response);
          this.toastr.success('Empresa cadastrada com sucesso!');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Erro ao cadastrar empresa', error);
          this.toastr.error('Erro ao cadastrar empresa. Por favor, tente novamente.');
        }
      );
    } else if (!this.aceitouTermos) {
      console.error('Erro: Você deve aceitar os termos e condições para continuar.');
      this.toastr.error('Você deve aceitar os termos e condições para continuar.');
    } else {
      console.error('Formulário inválido');
      this.toastr.error('Formulário inválido.');
    }
  }

  // Método para abrir o diálogo de Termos e Condições
    abrirTermosCondicoes(): void {
    const dialogRef = this.dialog.open(PrivacyPoliciesDialogComponent,{
      width:'800px'
    });
  }

  // Verifica se o controle do formulário é inválido e foi tocado
  public isFormControlInvalid(controlName: string): boolean {
    return !!(this.empresaForm.get(controlName)?.invalid && this.empresaForm.get(controlName)?.touched);
  }
}
