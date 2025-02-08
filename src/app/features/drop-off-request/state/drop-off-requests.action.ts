import { createAction, props } from "@ngrx/store";
    import { DropOffRequest } from "../../../models/drop-off-request";


export const loadDropOffRequests = createAction("[DropOffRequests]Load DropOffRequests")
export const loadDropOffRequestsSuccess = createAction("[DropOffRequests]Load DropOffRequests Success", props<{requests: DropOffRequest[]}>())
export const loadDropOffRequestsFailure =  createAction("[DropOffRequests]Load DropOffRequests Failure", props<{error: any}>())