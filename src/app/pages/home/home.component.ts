import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { LoginComponent } from "../../components/auth/login/login.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeroSectionComponent, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  login: boolean = false

  

  

}
