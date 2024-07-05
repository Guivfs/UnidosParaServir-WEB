import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  constructor(private http: HttpClient) {}

  cadastrarUsuario(dadosUsuario: any) {
    const body = {
      nomeUsuario: dadosUsuario.nomeCompleto,
      userUsuario: dadosUsuario.usuario,
      senhaUsuario: dadosUsuario.senha, 
      cepUsuario: dadosUsuario.cep,
      emailUsuario: dadosUsuario.email
    };

    return this.http.post(`${enviroment.baseUrlBackend}/registro-usuario`, body);
  }
}
