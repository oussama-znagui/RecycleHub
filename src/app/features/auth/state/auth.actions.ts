import { createAction, props } from "@ngrx/store";
import { User } from "../../../models/user";


export const login = createAction(
    '[login] User Login',
    props<{username: String, password: String}>()

)

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: User }>()
)

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
)

export const logout = createAction('[Auth] Logout');

export const signup = createAction(
    "[Auth] Signup",
    props<{ user: Omit<User, 'uuid'> }>() 
);

export const signupSuccess = createAction(
    "[Auth] Signup Success",
    props<{ user: User }>()
);

export const signupFailure = createAction(
    "[Auth] Signup Failure",
    props<{ error: string }>()
);