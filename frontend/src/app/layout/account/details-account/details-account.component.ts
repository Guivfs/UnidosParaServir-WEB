import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DetailsAccountService } from "./details-account.service";

@Component({
  selector: "app-details-account",
  templateUrl: "./details-account.component.html",
  styleUrls: ["./details-account.component.css"],
})
export class DetailsAccountComponent implements OnInit {
  profileFormUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private detailsAccountService: DetailsAccountService
  ) {
    this.profileFormUser = this.fb.group({
      nomeCompleto: [{ value: "", disabled: true }],
      cep: [{ value: "", disabled: true }],
      usuario: [{ value: "", disabled: true }],
      email: [{ value: "", disabled: true }],
      senha: [{ value: "", disabled: true }],
    });
  }

  ngOnInit(): void {
    this.detailsAccountService.getUser().subscribe((data) => {
      console.log("user:", data)
      this.profileFormUser.patchValue({
        nomeCompleto: data.nomeUsuario,
        cep: data.cepUsuario,
        usuario: data.userUsuario,
        email: data.emailUsuario,
        senha: data.senhaUsuario,
      });
    },
    (error) => {
      console.log(error)
    }
  );
  }
}
