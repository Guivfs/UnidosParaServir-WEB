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
      .post(url, { email:email, senha:senha }, { responseType: "json" })
      .pipe(
        map((data) => this.setTokenLocalStorage(data)),
        catchError((error) => {
          this.removerTokenLocalStorage();
          throw "Falha ao efetuar login!";
        })
      );
  }

  public getToken(): string | null {
    return localStorage.getItem(enviroment.token);
  }

  public getUserId(): string | null {
    return localStorage.getItem('id');
  }

  public isUser(): boolean {
    return JSON.parse(localStorage.getItem('isUser') || 'true');
  }

  private setTokenLocalStorage(respose: any): void {
    const { token, id, isUser } = respose;
    localStorage.setItem(enviroment.token, token);
    localStorage.setItem("ID", id);
    localStorage.setItem("IS USER:", JSON.stringify(isUser));
  }
  
  private removerTokenLocalStorage(): void {
    localStorage.removeItem(enviroment.token);
    localStorage.removeItem("ID");
    localStorage.removeItem("IS USER:");
  }
}
