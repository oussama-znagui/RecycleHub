import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

@Output() signupOffEvent = new EventEmitter();

  signupOff(){
    console.log("hello")
    this.signupOffEvent.emit();
  }
}
