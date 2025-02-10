import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { selectAuthState, selectAuthUser } from '../auth/state/auth.selectors';
import { CommonModule } from '@angular/common';
import { deleteUser } from '../auth/state/auth.actions';

@Component({
  selector: 'app-profil',
  imports: [CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  user$: Observable<User | null>;
  profileForm!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.user$ = this.store.select(selectAuthUser);
  }

  ngOnInit(): void {
    // this.user$.subscribe(user => {
    //   if (user) {
    //     this.profileForm = this.fb.group({
    //       name: [user.name, Validators.required],
    //       email: [user.email, [Validators.required, Validators.email]],
    //     });
    //   }
    // });
  }

  // updateProfile(): void {
  //   if (this.profileForm.valid) {
  //     this.store.dispatch(updateUser({ user: this.profileForm.value }));
  //   }
  // }

  deleteAccount(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      this.store.dispatch(deleteUser({id : id}));
    }
  }

}
