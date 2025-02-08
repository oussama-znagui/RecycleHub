import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as DropOffRequestsActions from './drop-off-requests.action';
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { DropOffRequest } from "../../../models/drop-off-request";
import { select, Store } from "@ngrx/store";
import { getUserId } from '../../../features/auth/state/auth.selectors';


@Injectable()
export class DropOffRequestsEffects{
    private actions$ = inject(Actions)
    private http = inject(HttpClient)
    private store = inject(Store)


    loadDropOffRequests$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DropOffRequestsActions.loadDropOffRequests),
            withLatestFrom(this.store.pipe(select(getUserId))),
            switchMap(([action, userId]) => {
               
                const url = `http://localhost:3000/drop-off-requests?id_particulier=${userId}`;
                
                return this.http.get<DropOffRequest[]>(url)
                .pipe(
                  map(requests => DropOffRequestsActions.loadDropOffRequestsSuccess({ requests })),
                  catchError(error => of(DropOffRequestsActions.loadDropOffRequestsFailure({ error })))
                );
              })
        )
    })


}