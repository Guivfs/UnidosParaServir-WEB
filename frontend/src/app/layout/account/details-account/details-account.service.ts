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

  constructor(
    private authenticationService: AuthenticationService, 
    private httpClient: HttpClient
  ) {}

  getUser(): Observable<any> {
    const idUser = this.authenticationService.getUserId();
    const url = `${this.apiUrl}/buscar-usuario/${idUser}`;
    return this.httpClient.get<any>(url);
  }

  deleteAccount(): Observable<any> {
    const idUser = this.authenticationService.getUserId();
    const url = `${this.apiUrl}/apagar-usuario/${idUser}`;
    return this.httpClient.delete<any>(url);
  }
  updateAccount(userData: any): Observable<any> {
    const idUser = this.authenticationService.getUserId();
    const url = `${this.apiUrl}/atualizar-usuario/${idUser}`;
    console.log("Dado enviado no service",userData)
    return this.httpClient.put<any>(url, userData);
  }
}
