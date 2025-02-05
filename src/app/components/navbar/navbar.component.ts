import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() loginOnEvent = new EventEmitter();
  @Output() signupOnEvent = new EventEmitter();

  loginOn(){
    console.log("hello")
    this.loginOnEvent.emit();
  }

  signupOn(){
    console.log("hello")
    this.signupOnEvent.emit();
  }
}
