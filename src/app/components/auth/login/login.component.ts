import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() loginOffEvent = new EventEmitter();

  loginOff(){
    console.log("hello")
    this.loginOffEvent.emit();
  }

}
