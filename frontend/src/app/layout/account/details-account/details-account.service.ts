import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { enviroment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DetailsAccountService {
  private apiUrl = enviroment.baseUrlBackend;
  private idUser = this.authenticationService.getUserId();

  constructor(
    private authenticationService: AuthenticationService, 
    private httpClient: HttpClient
  ) {}

  getUser(): Observable<any> {
    const url = `${this.apiUrl}/buscar-usuario/${this.idUser}`;
    return this.httpClient.get<any>(url);
  }

  deleteAccount(): Observable<any> {
    const url = `${this.apiUrl}/apagar-usuario/${this.idUser}`;
    return this.httpClient.delete<any>(url);
  }
  updateAccount(userData: any): Observable<any> {
    const url = `${this.apiUrl}/atualizar-usuario/${this.idUser}`;
    return this.httpClient.put<any>(url, userData);
  }
}
