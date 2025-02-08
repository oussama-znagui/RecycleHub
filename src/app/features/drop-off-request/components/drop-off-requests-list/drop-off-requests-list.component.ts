import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DropOffRequest } from '../../../../models/drop-off-request';
import { select, Store } from '@ngrx/store';
import { getDropOffRequests, getDropOffRequestsError, getDropOffRequestsLoading } from '../../state/drop-off-requests.selectors';
import { loadDropOffRequests } from '../../state/drop-off-requests.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drop-off-requests-list',
  imports: [CommonModule],
  templateUrl: './drop-off-requests-list.component.html',
  styleUrl: './drop-off-requests-list.component.css'
})
export class DropOffRequestsListComponent {
  requests?: Observable<DropOffRequest[]>;
  loading?: Observable<boolean>;
  error?: Observable<any>;


  constructor(private store: Store<{dropOffRequests: any}>){
    this.requests = this.store.pipe(select(getDropOffRequests));
    this.loading = this.store.pipe(select(getDropOffRequestsLoading));
    this.error = this.store.pipe(select(getDropOffRequestsError));
  }


  ngOnInit(){
    console.log("rr")
    this.store.dispatch(loadDropOffRequests());
    

  }
}
