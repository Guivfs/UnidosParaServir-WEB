import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient) { }

  //Metodo no qual trás a lista do tipo any, utilizando a lib do http client
  getVagas(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/vagas/buscar');
  }
}
