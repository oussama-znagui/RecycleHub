import { Component } from '@angular/core';
import { DropOffRequestsListComponent } from "../../../drop-off-requests-list/drop-off-requests-list.component";

@Component({
  selector: 'app-dashboard',
  imports: [DropOffRequestsListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
