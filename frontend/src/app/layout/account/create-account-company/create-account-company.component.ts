import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CreateAccountCompanyService } from "./create-account-company.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-create-account-company",
  templateUrl: "./create-account-company.component.html",
  styleUrl: "./create-account-company.component.css",
})
export class CreateAccountCompanyComponent implements OnInit {
  empresaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empresaService: CreateAccountCompanyService,
    private router: Router,
    private toastr: ToastrService
    ) {
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
    if (this.empresaForm.valid) {
      this.empresaService.cadastrarEmpresa(this.empresaForm.value).subscribe(
        response => {
          console.log('Empresa cadastrada com sucesso!', response);
          this.toastr.success('Empresa cadastrada com sucesso!');
          this.router.navigate(['/']);
        },
        error => {
          console.error('Erro ao cadastrar empresa', error);
          this.toastr.error('Erro ao cadastrar empresa. Por favor, tente novamente.');
        }
      );
    } else {
      console.error('Formulário inválido');
      this.toastr.error('Formulário inválido.');
    }
  }
}
