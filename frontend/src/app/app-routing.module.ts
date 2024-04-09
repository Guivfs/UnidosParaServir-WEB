import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/account/authentication/authentication.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CreateAccountComponent } from './layout/account/create-account/create-account.component';

const routes: Routes = [
  
  {path:'login',component:AuthenticationComponent},
  { path: 'criar-conta', component: CreateAccountComponent },
  { path: 'criar-conta-empresa', component: CreateAccountComponent },
  
  {path:'',component:NavbarComponent,
    children:[
      {path:'', component:HomeComponent}
    ]},

  //Orientando a URL de home se tornar a URL padrão
  {path:'**',redirectTo:'login'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
