// src/app/components/details-account/details-account.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details-account',
  templateUrl: './details-account.component.html',
  styleUrls: ['./details-account.component.css']
})
export class DetailsAccountComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      nomeCompleto: [''],
      cep: [''],
      usuario: [''],
      email: [''],
      senha: ['']
    });
  }

  ngOnInit(): void {}
}
