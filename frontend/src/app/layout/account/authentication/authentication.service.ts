import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { enviroment } from "../../../../enviroments/enviroment";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  public login(email: string, senha: string): Observable<any> {
    const url = `${enviroment.baseUrlBackend}/login`;

    return this.httpClient
      .post(url, { email, senha }, { responseType: "json" })
      .pipe(
        map((data) => this.setTokenLocalStorage(data)),
        catchError((error) => {
          this.removeTokenLocalStorage();
          throw "Falha ao efetuar login!";
        })
      );
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getUserId(): string | null {
    return localStorage.getItem('id');
  }

  public getRole(): string {
    return localStorage.getItem('role') || 'guest';
  }

  private setTokenLocalStorage(response: any): void {
    const { token, id, role } = response;
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('role', role);
  }
  
  public removeTokenLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
  }
}
