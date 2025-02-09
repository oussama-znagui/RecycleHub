import { Component } from '@angular/core';
import { DropOffRequestsListComponent } from "../../../drop-off-request/components/drop-off-requests-list/drop-off-requests-list.component";
import { AddDropOffRequestComponent } from "../../../drop-off-request/components/add-drop-off-request/add-drop-off-request.component";
import { Store } from '@ngrx/store';
import { logout } from '../../../auth/state/auth.actions';
import { DropOffRequestDetaisComponent } from '../../../drop-off-request/components/drop-off-request-detais/drop-off-request-detais.component';
import { DropOffRequest } from '../../../../models/drop-off-request';

@Component({
  selector: 'app-dashboard',
  imports: [DropOffRequestsListComponent, AddDropOffRequestComponent, DropOffRequestDetaisComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  requestToShow?: DropOffRequest

  constructor(private store: Store){

  }

  addRequestPopup: boolean = false;


  openAddPopup(){
    this.addRequestPopup = true;
  }
  close(){
    this.addRequestPopup = false;
   }


   logout(){
    console.log("allo")
     this.store.dispatch(logout())
   }

   showData(request: DropOffRequest){
    this.requestToShow= request
    
   }

   turnOff(){
    this.requestToShow = undefined;
   }
}
