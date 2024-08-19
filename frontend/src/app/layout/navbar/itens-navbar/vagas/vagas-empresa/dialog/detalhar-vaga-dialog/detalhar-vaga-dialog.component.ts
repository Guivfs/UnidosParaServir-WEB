import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VagasService } from '../../../vagas.service';

@Component({
  selector: 'app-detalhar-vaga-dialog',
  templateUrl: './detalhar-vaga-dialog.component.html',
  styleUrls: ['./detalhar-vaga-dialog.component.css']
})
export class DetalharVagaDialogComponent implements OnInit {
  vagaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private vagasService: VagasService
  ) {
    this.vagaForm = this.fb.group({
      idVaga: [''],
      tituloVaga: [''],
      descVaga: [''],
      fotoVaga: [''],
      idEmpresa: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getVagaDetalhe(id);
      }
    });
  }

  getVagaDetalhe(id: string): void {
    this.vagasService.getVagaById(id).subscribe(vaga => {
      this.vagaForm.patchValue({
        idVaga: vaga.idVaga,
        tituloVaga: vaga.tituloVaga,
        descVaga: vaga.descVaga,
        fotoVaga: vaga.fotoVaga,
        idEmpresa: vaga.idEmpresa
      });
      console.log(vaga);
    });
  }
}
