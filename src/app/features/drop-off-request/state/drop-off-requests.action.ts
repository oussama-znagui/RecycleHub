import { createAction, props } from "@ngrx/store";
    import { DropOffRequest } from "../../../models/drop-off-request";


export const loadDropOffRequests = createAction("[DropOffRequests]Load DropOffRequests")
export const loadDropOffRequestsSuccess = createAction("[DropOffRequests]Load DropOffRequests Success", props<{requests: DropOffRequest[]}>())
export const loadDropOffRequestsFailure =  createAction("[DropOffRequests]Load DropOffRequests Failure", props<{error: any}>())

export const addDropOffRequest = createAction(
    '[DropOff] Add Request',
    props<{ request: DropOffRequest }>()
  );
  
  export const addDropOffRequestSuccess = createAction(
    '[DropOff] Add Request Success',
    props<{ request: DropOffRequest }>()
  );
  
  export const addDropOffRequestFailure = createAction(
    '[DropOff] Add Request Failure',
    props<{ error: any }>()
  );

  export const deleteDropOffRequest = createAction(
    '[DropOffRequest] Delete Request',
    props<{ id: String }>()
  );
  
  export const deleteDropOffRequestSuccess = createAction(
    '[DropOffRequest] Delete Request Success',
    props<{ id: String }>()
  );


  export const deleteDropOffRequestFailure = createAction(
    '[DropOffRequest] Delete Request Failure',
    props<{ error: String }>()
  );