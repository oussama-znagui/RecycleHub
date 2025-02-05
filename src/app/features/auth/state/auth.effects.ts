import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { User } from '../../../models/user';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.http.get<{ users: User[] }>('/assets/data.json').pipe(
          map((data) => {
            const user = data.users.find(u => u.username === username && u.password === password);
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
