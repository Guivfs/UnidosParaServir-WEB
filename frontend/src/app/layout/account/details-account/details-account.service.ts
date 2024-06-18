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

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getUserOrCompanyDetails(): Observable<any> {
    const id = this.authService.getUserId();
    const isUser = this.authService.isUser();

    console.log("Id do individuo", id)
    if (id) {
      const url = isUser ? `${this.apiUrl}/buscar-usuario/${id}` : `${this.apiUrl}/buscar-usuario/${id}`;
      return this.http.get<any>(url);
    } else {
      throw new Error('User ID not found in local storage');
    }
  }
}
