import { createReducer, on } from "@ngrx/store";
import { DropOffRequest } from "../../../models/drop-off-request";
import { loadDropOffRequests, loadDropOffRequestsFailure, loadDropOffRequestsSuccess } from "./drop-off-requests.action";
import { state } from "@angular/animations";


export interface DropOffRequestsState {
    requests: DropOffRequest[];
    loading: boolean;
    error: any;
  }
  

  const initialState: DropOffRequestsState = {
    requests: [],
    loading: false,
    error: null,
  };



  export const dropOffRequestsReducer = createReducer(initialState,
    on(loadDropOffRequests, (state) => ({...state, loading: true})),
    on(loadDropOffRequestsSuccess, (state, {requests}) =>  ({ ...state, requests: requests, loading: false, error: null })),
    on(loadDropOffRequestsFailure, (state, { error }) => ({ ...state, loading: false, error: error }))


  )