import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { DetailsAccountComponent } from '../account/details-account/details-account.component';
import { DetailsAcountCompanyComponent } from '../account/details-acount-company/details-acount-company.component';
import { AuthenticationService } from '../account/authentication/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  loggedIn = false;
  dialogRef: any;

  constructor(private router: Router, public dialog: MatDialog, private authenticationService:AuthenticationService) {
    this.isLogged();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  isLogged() {
    const token = localStorage.getItem('token'); 
    console.log(localStorage)
    if (token) {
      this.loggedIn = true;
      console.log("O usuário está logado");
    } else {
      this.loggedIn = false;
      console.log("O usuário está deslogado");
    }
  }
  
  openDialogDetails() {
    const isUser = this.authenticationService.isUser();
    console.log("O usuário é", isUser);
  
    if (isUser) {  // simplificado, pois já é booleano
      this.dialog.open(DetailsAccountComponent, {
        width: '500px',
      });
    } else {  // se não for true, assume que é false
      this.dialog.open(DetailsAcountCompanyComponent, {
        width: '500px',
      });
    }
  }
  
  openEditAccount():void{
    const dialogRef = this.dialog.open(DetailsAccountComponent,{
      width: '500px',
    })
  }

  openLogoutConfirmation(): void {
    const dialogRef = this.dialog.open(LogoutConfirmationComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.logout();
      }
    });
  }

  logout() {
    localStorage.removeItem('token'); // Remover o token ao fazer logout
    this.loggedIn = false;
    console.log("Usuário deslogado");
  }

}
