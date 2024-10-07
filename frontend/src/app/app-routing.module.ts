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
import { VagasEmpresaComponent } from './layout/navbar/itens-navbar/vagas/vagas-empresa/vagas-empresa.component';
import { VagasUsuarioComponent } from './layout/navbar/itens-navbar/vagas/vagas-usuario/vagas-usuario.component';
import { DetalharVagaDialogComponent } from './layout/navbar/itens-navbar/vagas/vagas-empresa/dialog/detalhar-vaga-dialog/detalhar-vaga-dialog.component';
import { PrivacyPoliciesDialogComponent } from './layout/termsAndConditions/privacy-policies-dialog/privacy-policies-dialog.component';
import { PrivacyPoliciesComponent } from './layout/termsAndConditions/privacy-policies/privacy-policies.component';
import { ResultadoPesquisaComponent } from './layout/navbar/itens-navbar/vagas/vagas-usuario/resultado-pesquisa/resultado-pesquisa.component';
import { VisualizacaoIndividualVagaComponent } from './layout/navbar/itens-navbar/vagas/vagas-usuario/resultado-pesquisa/visualizacao-individual-vaga/visualizacao-individual-vaga.component';

const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'criar-conta', component: CreateAccountComponent },
  { path: 'criar-conta-empresa', component: CreateAccountCompanyComponent },
  { path: 'perfil/detalhar/:id', component: DetailsAccountComponent },
  { path: 'quem-somos-nos', component: QuemSomosNosComponent },
  { path: 'vaga-usuario', component:VagasUsuarioComponent},
  { path: 'vaga-empresa', component:VagasEmpresaComponent},
  { path: 'detalhar-vaga/:id', component: DetalharVagaDialogComponent },
  { path: 'termos-condicoes', component: PrivacyPoliciesComponent },
  { path: 'politicas-privacidade', component: PrivacyPoliciesComponent },
  { path: 'termos-condicoes-dialog', component: PrivacyPoliciesDialogComponent },
  { path: 'resultados-pesquisa', component: ResultadoPesquisaComponent },
  { path: 'visualizar-vaga/:id', component: VisualizacaoIndividualVagaComponent },
  { path: 'home', component: HomeComponent }, // Definindo a home como padrão
  { path: '**', redirectTo: 'home' } // Redirecionando qualquer rota inválida para a home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
