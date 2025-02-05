import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { User } from '../../../models/user';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient); 


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.http.get<User[] >('http://localhost:3000/users').pipe(
          map((users) => {console.log("jillali")
            console.log(users)
            const user = users.find(u => u.username === username);
            console.log(user)
            return user
              ? AuthActions.loginSuccess({ user })
              : AuthActions.loginFailure({ error: 'Identifiants incorrects' });
          }),
          catchError(() => of(AuthActions.loginFailure({ error: 'Erreur serveur' })))
        )
      )
    )
  );
}
