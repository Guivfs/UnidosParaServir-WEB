import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrl: "./authentication.component.css",
})
export class AuthenticationComponent implements OnInit {

  public formLogin:FormGroup;
  
  constructor(private fb:FormBuilder,private toast:ToastrService) {
    this.formLogin = this.criarFormLogin();
  }
  
  
  ngOnInit(): void {

  }

  public criarFormLogin():FormGroup{
    return this.fb.group({
      //formControlName
      username:["",[Validators.required, Validators.minLength(6)]],
      password:["",[Validators.required, Validators.minLength(6)]],
      termsConditions:[false]
    })
  }

  public isFormControlInvalid(controlName:string):boolean{
    return !!(this.formLogin.get(controlName)?.invalid && this.formLogin.get(controlName)?.touched)
  }

  public isTermsConditiosChecked():boolean {
    return this.formLogin.get("termsConditions")?.value
  }
}
