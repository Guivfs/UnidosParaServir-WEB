import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VagasService {
  private apiUrl = `${enviroment.baseUrlBackend}/vagas`

  constructor(private http: HttpClient) { }

  // Obter todas as vagas
  getVagas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  // Obter vaga pelo id
  getVagaById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/buscar/${id}`);
  }
  // Criar nova vaga
  createVaga(vaga: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, vaga);
  }

  // Atualizar vaga existente
  updateVaga(empresa_id: number, vaga: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/atualizar/${empresa_id}`, vaga);
  }

  // Deletar vaga
  deleteVaga(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/apagar/${id}`);
  }

  // Obter vagas por empresa
  getVagasByEmpresa(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/buscar-vagas-empresa`, { headers });
  }
}
