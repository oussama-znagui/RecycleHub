import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth.reducer';
import * as AuthActions from '../../state/auth.actions';
import { Observable } from 'rxjs';
import { selectAuthError } from '../../state/auth.selectors';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() loginOffEvent = new EventEmitter();
  @Output() signupOnEvent = new EventEmitter();
  loginForm!: FormGroup;
  errorMessage$!: Observable<String | null>;

  constructor(private store: Store<{auth: AuthState}>, private fb: FormBuilder){
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ['', Validators.required],
    });

    this.errorMessage$ = store.select(selectAuthError)


    
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
