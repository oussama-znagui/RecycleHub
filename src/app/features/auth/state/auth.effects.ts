import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { User } from '../../../models/user';
import { AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService) 
  private router = inject(Router)


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(user => 
            user
              ? AuthActions.loginSuccess({ user })
              : AuthActions.loginFailure({ error: 'Identifiants incorrects' })
          ),
          catchError(() => of(AuthActions.loginFailure({ error: 'Erreur serveur' })))
        )
      )
    )
  );


   onLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map(() => {
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );
}
