import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DropOffRequest } from "../../../models/drop-off-request";
import { DropOffRequestsState } from "./drop-off-requests.reducer";
import { state } from "@angular/animations";


const getDropOffRequestsState = createFeatureSelector<DropOffRequestsState>('dropOffRequests')

export const  getDropOffRequests = createSelector(getDropOffRequestsState , (state: DropOffRequestsState) => state.requests)
export const  getDropOffRequestsLoading = createSelector(getDropOffRequestsState, (state: DropOffRequestsState) => state.loading)
export const  getDropOffRequestsError = createSelector(getDropOffRequestsState, (state: DropOffRequestsState) => state.error)