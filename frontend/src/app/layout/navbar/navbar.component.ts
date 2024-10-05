import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {
  role: string = 'guest';
  loggedIn: boolean = false;

  constructor(
    private router: Router, 
    public dialog: MatDialog, 
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.isLogged();
    console.log(localStorage)
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  isLogged() {
    const token = this.authenticationService.getToken();
    this.loggedIn = !!token;
    console.log(`O usuário está ${this.loggedIn ? 'logado' : 'deslogado'}`);
  }

  checkUserRole() {
    this.role = this.authenticationService.getRole();
  }

  openDialogDetails() {
    if (this.role === 'user') {
      this.dialog.open(DetailsAccountComponent, {
        width: '500px',
      });
    } else if (this.role === 'company') {
      this.dialog.open(DetailsAcountCompanyComponent, {
        width: '500px'
      });
    }
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
    this.authenticationService.removeTokenLocalStorage();
    this.loggedIn = false;
    this.role = 'guest';
    this.router.navigate(['login'])
    console.log("Usuário deslogado");
  }
}
