import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/account/authentication/authentication.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CreateAccountComponent } from './layout/account/create-account/create-account.component';
import { CreateAccountCompanyComponent } from './layout/account/create-account-company/create-account-company.component';
import { SliderComponent } from './layout/slider/slider/slider.component';
import { DetailsAccountComponent } from './layout/account/details-account/details-account.component';
import { QuemSomosNosComponent } from './layout/navbar/itens-navbar/quem-somos-nos/quem-somos-nos.component';

const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'criar-conta', component: CreateAccountComponent },
  { path: 'criar-conta-empresa', component: CreateAccountCompanyComponent },
  { path: 'perfil/detalhar/:id', component: DetailsAccountComponent },
  { path: 'quem-somos-nos', component: QuemSomosNosComponent },
  // { path: 'para-empresas', component:},
  { path: 'home', component: HomeComponent }, // Definindo a home como padrão
  { path: '**', redirectTo: 'home' } // Redirecionando qualquer rota inválida para a home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
