import { createReducer, on } from "@ngrx/store";
import { DropOffRequest } from "../../../models/drop-off-request";
import {deleteDropOffRequest, addDropOffRequestSuccess, loadDropOffRequests, loadDropOffRequestsFailure, loadDropOffRequestsSuccess } from "./drop-off-requests.action";



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
    on(loadDropOffRequestsFailure, (state, { error }) => ({ ...state, loading: false, error: error })),
    on(addDropOffRequestSuccess, (state, { request }) => ({
      ...state,
      requests: [...state.requests, request],
    })),
    on(deleteDropOffRequest, (state, { id }) => ({
      ...state,
      requests: state.requests.filter(request => request.id !== id)
    }))

  )