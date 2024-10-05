import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CreateAccountService } from "./create-account.service";
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { PrivacyPoliciesDialogComponent } from "../../termsAndConditions/privacy-policies-dialog/privacy-policies-dialog.component";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.css"],
})
export class CreateAccountComponent implements OnInit {
  formUsuario: FormGroup;
  aceitouTermos: boolean = false;

  constructor(
    private fb: FormBuilder,
    private createAccountService: CreateAccountService,
    private route: Router,
    private toast: ToastrService,
    public dialog: MatDialog  // Injeção do MatDialog
  ) {
    this.formUsuario = this.fb.group({
      nomeCompleto: ["", Validators.required],
      cep: ["", [Validators.required]],
      usuario: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('Aceitou os termos?', this.aceitouTermos); 
    if (this.formUsuario.valid && this.aceitouTermos) {
      this.createAccountService.cadastrarUsuario(this.formUsuario.value).subscribe(
        (response) => {
          console.log("Dados enviados com sucesso:", response);
          this.toast.success("Usuário criado com sucesso!");
          this.route.navigate(["login"]);
        },
        (error) => {
          console.error("Erro ao enviar dados:", error);
          this.toast.error(error);
        }
      );
    } else if (!this.aceitouTermos) {
      this.toast.error("Você deve aceitar os termos e condições para continuar.");
    } else {
      console.error("Formulário inválido. Verifique os campos.");
    }
  }
  

  // Método para abrir o diálogo de Termos e Condições
  abrirTermosCondicoes(): void {
    const dialogRef = this.dialog.open(PrivacyPoliciesDialogComponent,{
      width:'800px'
    });
  }

  public isFormControlInvalid(controlName: string): boolean {
    return !!(this.formUsuario.get(controlName)?.invalid && this.formUsuario.get(controlName)?.touched);
  }
}
