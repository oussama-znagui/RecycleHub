import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const  selectAuthState = createFeatureSelector<AuthState>("auth")
export const selectAuthError = createSelector(
    selectAuthState,(state)=> state.error

)

export const getUserId = createSelector(
    selectAuthState,
    (state) => state.user?.id || null 
  );


  export const selectAuthUser = createSelector(
    selectAuthState,
    (state) => state!.user
);
