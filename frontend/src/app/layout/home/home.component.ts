import { Component, OnInit } from "@angular/core";
import { HomeService } from "../home/home.service";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  vagas: any[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getVagas().subscribe((data: any[]) => {
      this.vagas = data;
    });
  }
  
  
}
