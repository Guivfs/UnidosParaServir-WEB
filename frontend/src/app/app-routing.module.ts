import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';

const routes: Routes = [
  
  {path:'login',component:AuthenticationComponent},
  {path:'',component:HomeComponent},
  //Orientando a URL de home se tornar a URL padrão
  {path:'**',redirectTo:''}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
