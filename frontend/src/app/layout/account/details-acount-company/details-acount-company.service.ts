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
  private idCompany = this.authenticationService.getUserId()

  constructor(private authenticationService:AuthenticationService, private http:HttpClient) { }

  getCompany():Observable<any>{
    const url = `${this.apiUrl}/buscar-empresa/${this.idCompany}`
    return this.http.get<any>(url)
  }
  deleteCompany():Observable<any>{
    const url = `${this.apiUrl}/apagar-empresa/${this.idCompany}`
    return this.http.delete<any>(url)
  }
  updateAccount(companyData: any):Observable<any>{
    const url = `${this.apiUrl}/atualizar-empresa/${this.idCompany}`
    console.log(url, companyData)
    return this.http.put<any>(url, companyData)
  }
}
