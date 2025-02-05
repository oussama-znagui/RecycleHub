import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { LoginComponent } from "../../features/auth/components/login/login.component";
import { SignupComponent } from "../../features/auth/components/signup/signup.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeroSectionComponent, LoginComponent, SignupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  login: boolean = false
  signup: boolean = false;



  

}
