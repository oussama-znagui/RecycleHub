import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as DropOffRequestsActions from './drop-off-requests.action';
import { catchError, map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { select, Store } from "@ngrx/store";
import { getUserId } from '../../../features/auth/state/auth.selectors';
import { DropOffRequestService } from "../../../services/drop-off-request.service";
import { Action } from "@ngrx/store";
import { DropOffRequest } from "../../../models/drop-off-request";



@Injectable()
export class DropOffRequestsEffects{
    private actions$ = inject(Actions)
    private http = inject(HttpClient)
    private store = inject(Store)
    private dropOffRequestService = inject(DropOffRequestService)


    loadDropOffRequests$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DropOffRequestsActions.loadDropOffRequests),
            withLatestFrom(this.store.pipe(select(getUserId))),
            switchMap((userId) => {
                
                
                console.log(userId);
                
                
               
                const url = `http://localhost:3000/drop-off-requests?id_particulier=${userId[1]}`;
                
                return this.http.get<DropOffRequest[]>(url)
                .pipe(
                  map(requests => DropOffRequestsActions.loadDropOffRequestsSuccess({ requests })),
                  catchError(error => of(DropOffRequestsActions.loadDropOffRequestsFailure({ error })))
                );
              })
        )
    })



    addDropOffRequest$ = createEffect(() =>
      this.actions$.pipe(
          ofType(DropOffRequestsActions.addDropOffRequest),
          withLatestFrom(this.store.pipe(select(getUserId))),
          switchMap(([action, userId]) => {
              const request = {  ...action.request, 
                id_particulier: userId ?? '' }; 
              
              return this.dropOffRequestService.addDropOffRequest(request).pipe(
                  map((response) => DropOffRequestsActions.addDropOffRequestSuccess({ request: response }) as Action),
                  catchError((error) => of(DropOffRequestsActions.addDropOffRequestFailure({ error }) as Action))
              );
          })
      )
  );



  deleteDropOffRequest$ = createEffect(() =>
    this.actions$.pipe(
        ofType(DropOffRequestsActions.deleteDropOffRequest),
        mergeMap(action =>
            this.dropOffRequestService.deleteDropOffRequest(action.id).pipe(
                map(() => DropOffRequestsActions.deleteDropOffRequestSuccess({ id: action.id }) as Action),
                catchError(() => of(DropOffRequestsActions.deleteDropOffRequestFailure({ error: 'Delete failed' }) as Action))
            )
        )
    )
);

}