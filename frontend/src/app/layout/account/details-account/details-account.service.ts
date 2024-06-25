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
  
  constructor(private authenticationService:AuthenticationService , private httpClient:HttpClient) {}

  getUser():Observable<any>{
    const idUser = this.authenticationService.getUserId()
    const url = `${this.apiUrl}/buscar-usuario/${idUser}`

    return this.httpClient.get<any>(url)
  }
}

