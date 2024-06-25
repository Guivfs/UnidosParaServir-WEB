import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DetailsAcountCompanyService {
  private apiUrl = enviroment.baseUrlBackend;

  constructor(private authenticationService:AuthenticationService, private http:HttpClient) { }

  getCompany():Observable<any>{
    const idCompany = this.authenticationService.getUserId()
    const url = `${this.apiUrl}/buscar-empresa/${idCompany}`

    return this.http.get<any>(url)
  }
}
