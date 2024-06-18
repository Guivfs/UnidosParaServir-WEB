import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { DetailsAccountComponent } from '../account/details-account/details-account.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  loggedIn = false;

  constructor(private router: Router, public dialog: MatDialog) {
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
  openDetailsAccount():void{
    const dialogRef = this.dialog.open(DetailsAccountComponent,{
      width: '500px',
    })
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
