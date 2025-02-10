import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap ,switchMap} from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { User } from '../../../models/user';
import { AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService) 
  private router = inject(Router)
  private http = inject(HttpClient)


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
        map((user) => {
          if(user.user.role == "collecteur"){
            this.router.navigate(['/col']);
          }
          else{
            this.router.navigate(['/dashboard']);
          }
         
        })
      ),
    { dispatch: false }
  );



  logout$ = createEffect(
    () =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => {
            
                this.router.navigate(['/']); 
            })
        ),
    { dispatch: false } 
);


signup$ = createEffect(() =>
  this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(({ user }) =>
          this.http.post<User>("http://localhost:3000/users", user).pipe(
              map((newUser) => AuthActions.signupSuccess({ user: newUser })),
              catchError((error) =>
                  of(AuthActions.signupFailure({ error: error.message }))
              )
          )
      )
  )
);


deleteUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.deleteUser),
    tap(action => {
      this.authService.deleteUser(action.id).subscribe()
      this.router.navigate(['/'])
    })
  ),
  { dispatch: false }
);
}
