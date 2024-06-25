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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreateAccountCompanyComponent } from './layout/account/create-account-company/create-account-company.component';
import { SliderComponent } from './layout/slider/slider/slider.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ScrollToTopDirective } from './directive/scroll-to-top.directive';
import { DetailsAccountComponent } from './layout/account/details-account/details-account.component';
import { EditAccountComponent } from './layout/account/edit-account/edit-account.component';
import { DetailsAcountCompanyComponent } from './layout/account/details-acount-company/details-acount-company.component';


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
    EditAccountComponent,
    DetailsAcountCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
