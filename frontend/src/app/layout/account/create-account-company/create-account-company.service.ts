import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountCompanyService {

  constructor(private http:HttpClient) { }

  cadastrarEmpresa(dadosEmpresa:any){
    const body = {
      nomeEmpresa: dadosEmpresa.nomeEmpresa,
      emailEmpresa: dadosEmpresa.emailEmpresa,
      senhaEmpresa: dadosEmpresa.senhaEmpresa,
      descEmpresa: dadosEmpresa.descEmpresa,
      CNPJEmpresa: dadosEmpresa.CNPJEmpresa,
      razaoSocialEmpresa: dadosEmpresa.razaoSocialEmpresa,
      areaAtuacaoEmpresa: dadosEmpresa.areaAtuacaoEmpresa,
      numeroFuncionariosEmpresa: dadosEmpresa.numeroFuncionariosEmpresa,
      ramoEmpresa: dadosEmpresa.ramoEmpresa
    };

    return this.http.post(`${enviroment.baseUrlBackend}/registro-empresa`,body)
  }
}
