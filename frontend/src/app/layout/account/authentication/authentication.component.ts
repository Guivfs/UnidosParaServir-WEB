import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "./authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrl: "./authentication.component.css",
})
export class AuthenticationComponent implements OnInit {

  public formLogin:FormGroup;
  
  constructor(private fb:FormBuilder,private authenticationService:AuthenticationService,private route:Router,private toast:ToastrService) {
    this.formLogin = this.criarFormLogin();
  }
  
  
  ngOnInit(): void {

  }

  public criarFormLogin():FormGroup{
    return this.fb.group({
      email:["",[Validators.required, Validators.minLength(6)]],
      senha:["",[Validators.required, Validators.minLength(6)]],
      termsConditions:[false]
    })
  }

  public isFormControlInvalid(controlName:string):boolean{
    return !!(this.formLogin.get(controlName)?.invalid && this.formLogin.get(controlName)?.touched)
  }

  public isTermsConditiosChecked():boolean {
    return this.formLogin.get("termsConditions")?.value
  }

  public submitForm(){  
    const {email, senha} = this.formLogin.value;
    this.formLogin.reset();

    this.authenticationService.login(email,senha).subscribe(
      res => {
        this.toast.success("Login efetuado com sucesso!")
        this.route.navigate([''])
      },
      error =>{
        this.toast.error(error)
      }
    )
  }
}
