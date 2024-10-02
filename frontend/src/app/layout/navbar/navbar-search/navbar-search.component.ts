import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutConfirmationComponent } from '../logout-confirmation/logout-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../account/authentication/authentication.service';
import { DetailsAccountComponent } from '../../account/details-account/details-account.component';
import { DetailsAcountCompanyComponent } from '../../account/details-acount-company/details-acount-company.component';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.css']
})
export class NavbarSearchComponent implements OnInit{
  @Input() loggedIn: boolean = false;
  @Output() searchEvent = new EventEmitter<string>();
  searchTerm: string = '';
  role: string = 'guest';

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
  ) { }


  ngOnInit(): void {
    this.isLogged();
    this.checkUserRole();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  buscarVagas(): void {
    this.searchEvent.emit(this.searchTerm);
    this.router.navigate(['/resultados-pesquisa'], { queryParams: { search: this.searchTerm } });
  }


  isLogged() {
    const token = this.authenticationService.getToken();
    this.loggedIn = !!token;
    console.log(`O usuário está ${this.loggedIn ? 'logado' : 'deslogado'}`);
  }

  checkUserRole() {
    this.role = "guest";
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
    this.router.navigate(['login']);
    console.log("Usuário deslogado");
  }
}
