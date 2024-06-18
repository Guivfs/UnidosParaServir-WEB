// src/app/components/details-account/details-account.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DetailsAccountService } from './details-account.service';

@Component({
  selector: 'app-details-account',
  templateUrl: './details-account.component.html',
  styleUrls: ['./details-account.component.css']
})
export class DetailsAccountComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private detailsAccountService: DetailsAccountService) {
    this.profileForm = this.fb.group({
      nomeCompleto: [{ value: '', disabled: true }],
      cep: [{ value: '', disabled: true }],
      usuario: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      senha: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.detailsAccountService.getUserOrCompanyDetails().subscribe(
      data => this.profileForm.patchValue({
        nomeCompleto: data.nomeUsuario || data.nomeEmpresa,
        cep: data.cepUsuario || data.cnpjEmpresa,
        usuario: data.userUsuario,
        email: data.emailUsuario || data.emailEmpresa,
        senha: data.senhaUsuario || data.senhaEmpresa
      }),
      error => console.error('Error fetching user or company details', error)
    );
  }
}