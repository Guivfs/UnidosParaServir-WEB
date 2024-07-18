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
    return this.http.get<any>(this.apiUrl);
  }

  // Criar nova vaga
  createVaga(vaga: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, vaga);
  }

  // Atualizar vaga existente
  updateVaga(empresa_id: number, vaga: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${empresa_id}`, vaga);
  }

  // Deletar vaga
  deleteVaga(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Obter vagas por empresa
  getVagasByEmpresa(): Observable<any> {
    const token = localStorage.getItem('token'); // Certifique-se de que o token está no localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}-empresa`, { headers });
  }
}
