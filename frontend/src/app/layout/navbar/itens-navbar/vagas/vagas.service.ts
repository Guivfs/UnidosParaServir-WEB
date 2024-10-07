import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VagasService {
  private apiUrl = `${enviroment.baseUrlBackend}/vagas`;
  private apiUrlStandart = `${enviroment.baseUrlBackend}`;

  constructor(private http: HttpClient) { }

  // Função para criar um header com o token
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Obter todas as vagas
  getVagas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listar`);
  }

  getVagasByTitulo(titulo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/buscar-titulo?titulo=${titulo}`);
  }

  // Obter vaga pelo id
  getVagaById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/buscar/${id}`);
  }
  // Obter vaga pelo id
  getVagaByIdEmpresa(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/buscar-vaga/${id}`);
  }

  // Obter vagas por empresa
  getVagasByEmpresa(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrl}/buscar-vagas-empresa/${id}`, { headers });
  }

  // Criar nova vaga
  createVaga(vaga: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, vaga);
  }

  // Atualizar vaga existente
  updateVaga(idVaga: number, vaga: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/atualizar/${idVaga}`, vaga);
  }

  // Deletar vaga
  deleteVaga(idVaga: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/apagar/${idVaga}`);
  }

  // Ajuste no método preencherVaga para receber um objeto com idUsuario e statusVaga.
  preencherVaga(idVaga: number, preenchimentoData: { idUsuario: number, statusVaga: string }): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<any>(`${this.apiUrl}/preencher/${idVaga}`, preenchimentoData, { headers });
  }

  demitirUsuario(idVaga: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/demitir/${idVaga}`, {});
  }

  // Obter visitas ao CV por usuário
  getVisitasCV(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrlStandart}/visitas/obter`, { headers });
  }

  // Obter candidaturas por usuário
  getCandidaturas(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrlStandart}/candidaturas/obter`, { headers });
  }

  verificarCandidaturaUsuario(idVaga: string, idUsuario: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlStandart}/candidaturas/verificar-candidatura/${idVaga}/${idUsuario}`);
  }

  candidatarUsuario(candidatura: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    // Enviar o objeto de candidatura para o backend
    console.log("Candidatura do service:", candidatura)
    return this.http.post<any>(`${this.apiUrlStandart}/candidaturas/criar`, candidatura, { headers });
  }

  obterQuantidadeNovasCandidaturas(): Observable<any> {
    const headers = this.createAuthorizationHeader(); 
    return this.http.get(`${this.apiUrlStandart}/candidatura/quantidade-novas-candidaturas`, { headers });
  }

  // Obter candidaturas por vaga
  getCandidaturasByVaga(idVaga: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlStandart}/candidaturas/obter/${idVaga}`);
  }

  // Registrar visita ao perfil do usuário
  registrarVisitaPerfil(idUsuario: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<any>(`${this.apiUrlStandart}/visitas/criar`, { idUsuario }, { headers });
  }

  // Obter detalhes de um usuário pelo ID
  getUsuarioById(idUsuario: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${this.apiUrlStandart}/buscar-usuario/${idUsuario}`, { headers });
  }
}
