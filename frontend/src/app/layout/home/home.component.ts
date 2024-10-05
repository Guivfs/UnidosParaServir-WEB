import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../account/authentication/authentication.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  role: string = "guest";

  constructor(
    private authenticationService: AuthenticationService
  ){}

  ngOnInit(): void {
    this.checkUserRole()
  }

  checkUserRole() {
    this.role = this.authenticationService.getRole();
  }
}

