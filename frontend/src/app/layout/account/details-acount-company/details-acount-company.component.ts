import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DetailsAcountCompanyService } from "./details-acount-company.service";

@Component({
  selector: "app-details-acount-company",
  templateUrl: "./details-acount-company.component.html",
  styleUrl: "./details-acount-company.component.css",
})
export class DetailsAcountCompanyComponent implements OnInit {
  profileFormCompany: FormGroup;

  constructor(
    private fb: FormBuilder,
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
}
