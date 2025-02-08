import { Component } from '@angular/core';
import { DropOffRequestsListComponent } from "../../../drop-off-request/components/drop-off-requests-list/drop-off-requests-list.component";
import { AddDropOffRequestComponent } from "../../../drop-off-request/components/add-drop-off-request/add-drop-off-request.component";

@Component({
  selector: 'app-dashboard',
  imports: [DropOffRequestsListComponent, AddDropOffRequestComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  addRequestPopup: boolean = false;


  openAddPopup(){
    this.addRequestPopup = true;
  }
  close(){
    this.addRequestPopup = false;
   }
}
