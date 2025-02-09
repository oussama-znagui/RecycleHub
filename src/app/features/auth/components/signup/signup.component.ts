import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth.reducer';
import * as AuthActions from "../../state/auth.actions";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

@Output() signupOffEvent = new EventEmitter();
signupForm: FormGroup;
@Output() signupSuccess = new EventEmitter();

constructor(private fb: FormBuilder, private store: Store<AuthState>) {
  this.signupForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      role: ["particulier"] 
  });
}

  signupOff(){
    console.log("hello")
    this.signupOffEvent.emit();
  }

  onSubmit() {
    if (this.signupForm.valid) {
        this.store.dispatch(AuthActions.signup({ user: this.signupForm.value }));
        this.signupOffEvent.emit();
        this.signupSuccess.emit();

    }
}
}
