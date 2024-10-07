import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/account/authentication/authentication.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateAccountComponent } from './layout/account/create-account/create-account.component';
import { LogoutConfirmationComponent } from './layout/navbar/logout-confirmation/logout-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateAccountCompanyComponent } from './layout/account/create-account-company/create-account-company.component';
import { SliderComponent } from './layout/slider/slider/slider.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ScrollToTopDirective } from './directive/scroll-to-top.directive';
import { DetailsAccountComponent } from './layout/account/details-account/details-account.component';
import { DetailsAcountCompanyComponent } from './layout/account/details-acount-company/details-acount-company.component';
import { DeleteConfirmationDialogComponent } from './layout/account/details-account/dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UpdateAccountComponent } from './layout/account/details-account/dialog/update/update-account/update-account.component';
import { UpdateConfirmationDialogComponent } from './layout/account/details-acount-company/dialog/update-confirmation-dialog/update-confirmation-dialog.component';
import { QuemSomosNosComponent } from './layout/navbar/itens-navbar/quem-somos-nos/quem-somos-nos.component';
import { VagasUsuarioComponent } from './layout/navbar/itens-navbar/vagas/vagas-usuario/vagas-usuario.component';
import { VagasEmpresaComponent } from './layout/navbar/itens-navbar/vagas/vagas-empresa/vagas-empresa.component';
import { NovaVagaDialogComponent } from './layout/navbar/itens-navbar/vagas/vagas-empresa/dialog/nova-vaga-dialog/nova-vaga-dialog.component';
import { EditarVagaDialogComponent } from './layout/navbar/itens-navbar/vagas/vagas-empresa/dialog/editar-vaga-dialog/editar-vaga-dialog.component';
import { DetalharVagaDialogComponent } from './layout/navbar/itens-navbar/vagas/vagas-empresa/dialog/detalhar-vaga-dialog/detalhar-vaga-dialog.component';
import { ExcluirVagaDialogComponent } from './layout/navbar/itens-navbar/vagas/vagas-empresa/dialog/excluir-vaga-dialog/excluir-vaga-dialog.component';
import { ConfirmacaoDemissaoDialogComponent } from './layout/navbar/itens-navbar/vagas/vagas-empresa/dialog/editar-vaga-dialog/confirmar-demissao/confirmacao-demissao-dialog/confirmacao-demissao-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PrivacyPoliciesComponent } from './layout/termsAndConditions/privacy-policies/privacy-policies.component';
import { PrivacyPoliciesDialogComponent } from './layout/termsAndConditions/privacy-policies-dialog/privacy-policies-dialog.component';
import { ResultadoPesquisaComponent } from './layout/navbar/itens-navbar/vagas/vagas-usuario/resultado-pesquisa/resultado-pesquisa.component';
import { NavbarSearchComponent } from './layout/navbar/navbar-search/navbar-search.component';
import { VisualizacaoIndividualVagaComponent } from './layout/navbar/itens-navbar/vagas/vagas-usuario/resultado-pesquisa/visualizacao-individual-vaga/visualizacao-individual-vaga.component';
import { PerfilUsuarioDialogComponent } from './layout/navbar/itens-navbar/vagas/vagas-empresa/dialog/candidatura/perfil-usuario-dialog/perfil-usuario-dialog.component';
import { CandidaturasDialogComponent } from './layout/navbar/itens-navbar/vagas/vagas-empresa/dialog/candidatura/candidaturas-dialog/candidaturas-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    NavbarComponent,
    CreateAccountComponent,
    LogoutConfirmationComponent,
    CreateAccountCompanyComponent,
    SliderComponent,
    FooterComponent,
    ScrollToTopDirective,
    DetailsAccountComponent,
    DetailsAcountCompanyComponent,
    DeleteConfirmationDialogComponent,
    UpdateAccountComponent,
    UpdateConfirmationDialogComponent,
    QuemSomosNosComponent,
    VagasUsuarioComponent,
    VagasEmpresaComponent,
    NovaVagaDialogComponent,
    EditarVagaDialogComponent,
    DetalharVagaDialogComponent,
    ExcluirVagaDialogComponent,
    ConfirmacaoDemissaoDialogComponent,
    PrivacyPoliciesComponent,
    PrivacyPoliciesDialogComponent,
    ResultadoPesquisaComponent,
    NavbarSearchComponent,
    VisualizacaoIndividualVagaComponent,
    PerfilUsuarioDialogComponent,
    CandidaturasDialogComponent,
  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
