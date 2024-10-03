import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VagasService {
  private apiUrl = `${enviroment.baseUrlBackend}/vagas`;

  constructor(private http: HttpClient) { }

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

  // Obter vagas por empresa
  getVagasByEmpresa(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
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

  // Preencher vaga (usuário logado preenche uma vaga)
  preencherVaga(idVaga: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.put<any>(`${this.apiUrl}/preencher/${idVaga}`, {}, { headers });
  }

  demitirUsuario(idVaga: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/demitir/${idVaga}`, {});
  }

  // Obter visitas ao CV por usuário
  getVisitasCV(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/visitas/obter`);
  }

  // Obter candidaturas por usuário
  getCandidaturas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/candidaturas/obter`);
  }

}
