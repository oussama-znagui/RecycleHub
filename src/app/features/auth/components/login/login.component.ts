import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth.reducer';
import * as AuthActions from '../../state/auth.actions';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() loginOffEvent = new EventEmitter();
  @Output() signupOnEvent = new EventEmitter();
  loginForm!: FormGroup;

  constructor(private store: Store<{auth: AuthState}>, private fb: FormBuilder){
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ['', Validators.required],
    });
  }


  onSubmit(): void{
    console.log("allo")
    if(this.loginForm.valid){
      console.log("allo")
      const {username,password} = this.loginForm.value;
      this.store.dispatch(AuthActions.login({username,password}))
    }
  }



  loginOff(){
    console.log("hello")
    this.loginOffEvent.emit();
  }

  signupOn(){
    this.signupOnEvent.emit();
  }



}
