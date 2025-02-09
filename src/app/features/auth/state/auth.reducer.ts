import { createReducer, on } from "@ngrx/store";
import { User } from "../../../models/user";
import * as AuthActions from './auth.actions';



export interface AuthState{
    user: User | null;
  error: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    error: null
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess,(state, {user}) => {
        localStorage.setItem('user', JSON.stringify(user));
       return {...state, user, error: null }
    }),


    on(AuthActions.loginFailure, (state, { error }) => ({ ...state, user: null, error })),
    on(AuthActions.logout, () => {
        localStorage.removeItem('user'); 
        return { user: null, error: null };
    }),
    on(AuthActions.signupSuccess, (state, { user }) => ({ ...state, user, error: null })),
    on(AuthActions.signupFailure, (state, { error }) => ({ ...state, user: null, error }))

)